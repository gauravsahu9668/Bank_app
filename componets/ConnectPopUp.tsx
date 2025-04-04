"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import Image from 'next/image'
import PlaidLink from './PlaidLink'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { useRouter} from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'
import { createLinkToken } from '@/lib/actions/user.actions'
import { useCallback } from 'react'
import { exchangePublicToken } from '@/lib/actions/user.actions'
import { usePlaidLink } from 'react-plaid-link'
import { PlaidLinkOptions } from 'react-plaid-link'
import { PlaidLinkOnSuccess } from 'react-plaid-link'
import { Button } from '@/components/ui/button'
const ConnectPopUp =({user}:{user:User}) => {
     const router=useRouter()
        const [token,setToken]=useState('');
        useEffect(()=>{
            const getLinkToken=async()=>{
                const data=await createLinkToken(user);
                setToken(data?.linkToken)
            }
            getLinkToken()
            console.log("step-1")
        },[user])
        const onSuccess=useCallback<PlaidLinkOnSuccess>(async(public_token:string)=>{
            console.log("step-3")
            await exchangePublicToken({
                publicToken:public_token,
                user
            })
            router.push('/')
        },[user])
        const config:PlaidLinkOptions={
            token,
            onSuccess
        }
        const {open,ready}=usePlaidLink(config)
  return (
    <Dialog>
       <DialogTrigger>
        <div className='flex ml-3 items-center justify-center gap-x-1'>
            <Image className="text-semibold text-black" src='/icons/plus.svg' width={20} height={20} alt="plus"></Image>
            <p className='text-semibold text-black '>Add Bank</p>
        </div>
       </DialogTrigger>
       <DialogContent>
       <DialogHeader>
       <DialogTitle>Horizon</DialogTitle>
       <DialogDescription>
          <p>wants to connect to multiple bank?</p>
          <Button onClick={()=>{open()}}>Connect Bank</Button>
       </DialogDescription>
       </DialogHeader>
       </DialogContent>
    </Dialog>

  )
}
export default ConnectPopUp