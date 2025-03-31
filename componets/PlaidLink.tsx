import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import { createLinkToken } from '@/lib/actions/user.actions';
import { exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';
const PlaidLink = ({user,variant}:PlaidLinkProps) => {
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
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="text-16 rounded-lg border  bg-color font-semibold text-white shadow-form"
        >
          Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost" className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
      ): (
        <Button onClick={() => open()} className="flex justify-start cursor-pointer gap-3 rounded-lg bg-transparent bg-color flex-row">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink
