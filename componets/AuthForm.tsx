"use client" 
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { authformSchema } from '@/lib/utitls'
import SignUp from '@/app/(auth)/sign-up/page'
import { SignUpFunc,SignInFunc } from '@/lib/actions/user.actions'
// this is the type of our schema we have
const AuthForm = ({type}:AuthFormProps) => {
    const [user,setUser]=useState(null)
    const [loading,setloding]=useState(false);
    // 1. Define your form.
    const formSchema=authformSchema(type)
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues:{
       email: "",
       password:""
     },
     })
    const onSubmit=async(data: z.infer<typeof formSchema>)=> {
        try{
        // sgin up on the appwrite account and generate a plaid token
          if(type=="sign-up"){
               const newUser = await SignUpFunc(data);
               setUser(newUser)
            }
            if(type==='sign-in'){
                const response=await SignInFunc({
                    email:data.email,
                    password:data.password
                })
            }

          }
        catch(error){
            console.log(error);
        }finally{
            setloding(false)
        }
        setloding(true);
        console.log(data)
        setloding(false);
    }
  return (
   <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8'>
    <header className='flex flex-col gap-5 md:gap-8'>
             <Link href="/"
            className=' cursor-pointer items-center flex gap-1'
            >
               <Image src={'/icons/logo.svg'} alt="Horizon logo"
               width={34}
               height={34}
               ></Image>
               <h1 className='text-black-1 text-26  font-bold font-ibm-plex-serif'>
                Horizon
               </h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {
                        user ? "Link Account" : type === 'sign-in' ? 'Sign In': 'Sign Up'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to get started':
                        "Please enter your details"}
                    </p>
                </h1>
            </div>
    </header>
    {
    user ? (
            <div className='flex flex-col gap-4'>
                {/* plaid link account */}
            </div>
    ):
    <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {
                type==='sign-up' && (
                    <>
                        <div className='flex gap-4'>
                        <FormField
                        control={form.control}
             name="firstName"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    Firstname
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='Enter your firstname'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                        />
                        <FormField
                        control={form.control}
             name="lastName"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    lastName
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='Enter your lastname'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                        />
                        </div>
                        <FormField
                        control={form.control}
             name="Address"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    Address
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='Enter your specific address'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                        />
                       <div className='flex gap-4'>
                       <FormField
                        control={form.control}
             name="State"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    State
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='ex. NY'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                        />
                      <FormField
                        control={form.control}
             name="PostalCode"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    Postal Code
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='ex. 12345'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                       />
                       </div>
                       <div className='flex gap-4'>
                       <FormField
                        control={form.control}
             name="DateOfBirth"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    Date Of Birth
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='yyyy-mm-dd'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                        />
                      <FormField
                        control={form.control}
             name="SSN"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    SSN
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='ex. 1234'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                       />
                        </div> 
                    </>
                )
            }
                       <FormField
                        control={form.control}
             name="email"
             render={({ field }) => (
             <div className='flex flex-col gap-1.5'>
                <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                    Email
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='Enter your Email'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}
                       />
                       <FormField
                        control={form.control}
                       name="password"
                       render={({ field }) => (
                      <div className='flex flex-col gap-1.5'>
                      <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
                        Password
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input placeholder='Enter password'
                        className='input-class'
                        {...field}></Input>
                    </FormControl>
                    <FormMessage className='text-12 text-red-500 mt-2'>
                    </FormMessage>
                </div>
             </div>
                        )}                       
                       />
            <div className='flex flex-col gap-4'>
            <Button type="submit" disabled={loading} className='text-16 rounded-lg border bg-color font-semibold text-white shadow-form'>
                {
                    loading ? (
                        <>
                         <Loader2 size={20} className='animate-spin'></Loader2> &nbsp;
                         Loading...
                        </>
                    ):(
                    type==="sign-in" ? "Sign In" : "Sign Up"
                    )
                }
            </Button>
            </div>
            </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>{
                type==="sign-in"? "Don't have an account?":"Already have an account"
                }
                </p>
                <Link href={type==="sign-in"? "/sign-up" : "/sign-in"} className='text-14 cursor-pointer font-medium text-[#0179FE]'>
                {
                    type==="sign-in" ? 'Sign Up' :"Sign In"
                }
                </Link>
            </footer>
    </>
    }
   </section>
  )
}
export default AuthForm
