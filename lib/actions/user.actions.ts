'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { extractCustomerIdFromUrl, parseStringify } from "../utitls";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { Languages } from "lucide-react";
import { plaidClient } from "../plaid";
import { access } from "fs";
import { encryptId } from "../utitls";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import {PrismaClient} from "@prisma/client"
const {
  APPWRITE_DATABASE_ID:DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID:USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID:BANK_COLLECTION_ID
}=process.env
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}
export const SignInFunc = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    
    // 1. Set the session cookie
    const cookieStore=await cookies()
    //@ts-ignore
    cookies().set('appwrite-session', response.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    const user = await getUserInfo({ userId: response.userId })
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error('SignIn Error:', error);
    // Return error to show to user
    return { error: 'Invalid credentials or server error' };
  }
}
export const SignUpFunc=async({password,...data}:SignUpParams)=>{
  let newUserAccount;
    try{
        // Create a user account
        const prisma=new PrismaClient()
        const {email,firstName,lastName}=data;
        const {account,database} =await createAdminClient();
        newUserAccount=await account.create(ID.unique(),email,password,`${firstName}${lastName}`)

        if(!newUserAccount) throw Error("Error creating user")
          
        const dwollaCustomerUrl=await createDwollaCustomer({
          ...data,
          type: 'personal'
        })
        if(!dwollaCustomerUrl){
          throw Error("Error creating dwolla customer")
        }
        console.log(dwollaCustomerUrl)
        const dwollaCustomerId=extractCustomerIdFromUrl(dwollaCustomerUrl)
        const newuser=await database.createDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          ID.unique(),
          {
            ...data,
            userId:newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl
          }
        )
        const walletUser= await prisma.walletUser.create({
          data:{
            id:newuser.$id,
            email:email,
            name:`${firstName}${lastName}`,
            amount:0
          }
        })
        console.log(walletUser,"this is the wallet user")
        const session=await account.createEmailPasswordSession(email,password)
        //@ts-ignore
        cookies().set("appwrite-session",session.secret,{
          path:"/",
          httpOnly:true,
          sameSite:"strict",
          secure:true
        })
        return parseStringify(newuser)
    }catch(error){
     console.log(error);
    }
}
export async function getLoggedInUser(){
  try{
    const {account}=await createSessionClient();
    const result=await account.get()

    const user=await getUserInfo({userId:result.$id})
    return parseStringify(user)
  }catch(error){
    return null
  }
}
export const logoutAction=async()=>{
  try{
    const {account} =await createSessionClient();
    const cookieStore=await cookies();
    cookieStore.delete('appwrite-session');
    await account.deleteSession('current')
    redirect('/sign-in')
  }
  catch(error){
    return null
  }
}
export const createLinkToken=async(user:User)=>{
  try{
    const tokenParams={
       user:{
        client_user_id:user.$id
       },
       client_name:`${user.firstName} ${user.lastName}`,
       products:['auth'] as Products[],
       language:'en',
       country_codes: ['US'] as CountryCode[]
    }
    const response=await plaidClient.linkTokenCreate(tokenParams);
    console.log("step-2")
    return parseStringify({
      linkToken:response.data.link_token
    })
  }catch(error){
    console.log(error)
  }
}
export const createBankAccount=async({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId
}:createBankAccountProps)=>{
 try{
  const {database}=await createAdminClient();
  console.log("step-13")
  const bankAccount =await database.createDocument(
     DATABASE_ID!,
     BANK_COLLECTION_ID!,
     ID.unique(),
     {
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      shareableId
     }
  );
  console.log("step-14")
  return parseStringify(bankAccount)
 }catch(error){
  console.log(error)
 }
}
export const exchangePublicToken=async({
  publicToken,user
}:exchangePublicTokenProps)=>{
    try{
      console.log("step-4")
      const response=await plaidClient.itemPublicTokenExchange({
        public_token:publicToken
      });
      const accessToken=response.data.access_token
      const itemId=response.data.item_id
      // get accountinformation
      // Get account information from plaid using the access token
      const accountResponse=await plaidClient.accountsGet({
        access_token:accessToken
      });
      console.log("step-5")
      const accountData=accountResponse.data.accounts[0];
      // create a processor token for the dwolla using the access toke accountId
      const request:ProcessorTokenCreateRequest={
        access_token:accessToken,
        account_id:accountData.account_id,
        processor:"dwolla" as ProcessorTokenCreateRequestProcessorEnum
      }
      console.log("step-6")
      const processorTokenResponse=await plaidClient.processorTokenCreate(request);
      const processorToken=processorTokenResponse.data.processor_token
      const fundingSourceUrl=await addFundingSource({
        dwollaCustomerId:user.dwollaCustomerId,
        processorToken,
        bankName:accountData.name
      })
      console.log("step-11")
      if(!fundingSourceUrl) throw Error
      // we create a bank account using the user id item id account id access token
      // funding sourse url and sharable id
      await createBankAccount({
        userId:user.$id,
        bankId:itemId,
        accountId:accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId:encryptId(accountData.account_id)
      })
      console.log("step-12")
//  what is revalidating the account to see the new account ewe created on home page      revalidatePath('/');

      return parseStringify({
         publicTokenExchange:"complete"}
      )
    }catch(error){
      console.log(error)
    }
}
export const getBanks=async({userId}:getBanksProps)=>{
   try{
      const {database}= await createAdminClient()

      const banks=await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('userId',[userId])]
      )
      return parseStringify(banks.documents); 

   }catch(error){
    console.log(error);
   }
}
export const getBank=async({documentId}:getBankProps)=>{
  try{
     const {database}= await createAdminClient()

     const bank=await database.listDocuments(
       DATABASE_ID!,
       BANK_COLLECTION_ID!,
       [Query.equal('$id',[documentId])]
     )
     return parseStringify(bank.documents[0]); 

  }catch(error){
   console.log(error);
  }
}
export const getBankByAccountId=async({accountId}:getBankByAccountIdProps)=>{
  try{
     const {database}= await createAdminClient()

     const bank=await database.listDocuments(
       DATABASE_ID!,
       BANK_COLLECTION_ID!,
       [Query.equal('accountId',[accountId])]
     )
     if(bank.total!==1) return null
     return parseStringify(bank.documents[0]); 
  }catch(error){
   console.log(error);
  }
}