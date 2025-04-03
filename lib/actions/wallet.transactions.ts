"use server"
import { PrismaClient } from "@prisma/client";
import { getLoggedInUser } from "./user.actions";
import { Wallpaper } from "lucide-react";
import { Erica_One } from "next/font/google";
const prisma =new PrismaClient();
export const getWalletBalance=async()=>{
    try{
        const user=await getLoggedInUser();
        const walletUser= await prisma.walletUser.findUnique({
            where:{
                email:user.email
            }
        })
        console.log(walletUser)
        return walletUser
    }catch(error){
        console.log(error)
    }
}
export const createOnRampTransaction=async(amount:string,url:string,type:string)=>{
        const user=await getLoggedInUser();
        const newAmount=Number(amount);
        const token=Math.random().toString();
        const walletUser=await getWalletBalance();
        if(type=="deposite"){
           return prisma.$transaction(async(tx)=>{
               const sender=await tx.walletUser.update({
                data:{
                    amount:{
                        decrement:newAmount
                    }
                },
                where:{
                    id:walletUser?.id
                }
               })
               if(sender.amount<0){
                throw new Error(`doent have enough to send ${newAmount}`)
               }

               const transaction=await tx.onRampTransaction.create({
                data:{
                    userId:walletUser?.id || "",
                    status:"Processing",
                    token :token,
                    provider: url==="https://netbanking.hdfcbank.com"? "HDFC" : "Axis",
                    amount:newAmount,
                    startTime:new Date,
                    type:'debit'
                }
               })
               return transaction
           })
        }else{
            return prisma.$transaction(async(tx)=>{
                const sender=await tx.walletUser.update({
                 data:{
                     amount:{
                        increment:newAmount
                     }
                 },
                 where:{
                     id:walletUser?.id
                 }
                })
                const transaction=await tx.onRampTransaction.create({
                 data:{
                     userId:walletUser?.id || "",
                     status:"Processing",
                     token :token,
                     provider: url==="https://netbanking.hdfcbank.com"? "HDFC" : "Axis",
                     amount:newAmount,
                     startTime:new Date,
                     type:'credit'
                 }
                })
                return transaction
            })
        }
}
export const createP2Ptransaction=async(amount:string,Email:string,note:string)=>{
      const walletUser=await getWalletBalance();
      const newAmount=Number(amount)
      return prisma.$transaction(async(tx)=>{
            const sender=await tx.walletUser.update({
                data:{
                    amount:{
                        decrement:Number(amount)
                    }
                },
                where:{
                    id:walletUser?.id
                }
               })
            const receiverUpdate=await tx.walletUser.update({
            data:{
                amount:{
                    increment:Number(amount)
                }
            },
            where:{
                email:Email
            }
            })
         const peerTransaction=await tx.peerToPeerTransactions.create({
            data:{
                amount :Number(amount),
                date:new Date,
                senderId:sender.id,
                receiverId:receiverUpdate.id,
                Note:note,
                recieverEmail:Email
            }
         })
         return peerTransaction
      })
}
export const getAllPeerTRansactions=async()=>{
    const walletUser=await getWalletBalance();
    try{
       const sends=await prisma.peerToPeerTransactions.findMany({
        where:{
            senderId:walletUser?.id
        }
       })
       const receives=await prisma.peerToPeerTransactions.findMany({
        where:{
            receiverId:walletUser?.id
        }
       })
       return {balance:[...sends,...receives],senderId:walletUser?.id}
    }catch(error){
        console.log(error)
        return { balance: [] };
    }
}
export const getAllOnRampTransactions=async()=>{
    const walletUser=await getWalletBalance();
    try{
       const sends=await prisma.onRampTransaction.findMany({
        where:{
            userId:walletUser?.id
        }
       })
       return [...sends]
    }catch(error){
        console.log(error)
        return []
    }
}
