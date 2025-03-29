"use server";
// all these functions are server actions
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { Database } from "lucide-react";
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  //@ts-ignore
  const session = await cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
  };
}
// we are here creating the client with oroject id and the all details so that our clint know which 
// appwrite project we are tak=lking about
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);
  return {
    get account() {
      return new Account(client);
    },
    get database(){
        return new Databases(client)
    },
    get user(){
        return new Users(client)
    }
  };
}
