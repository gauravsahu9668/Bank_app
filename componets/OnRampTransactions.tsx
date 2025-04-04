"use client"
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { formatDateTime } from '@/lib/utitls';
  import formatAmount from '@/lib/utitls';
  import { getAllOnRampTransactions } from '@/lib/actions/wallet.transactions';
  import { getTransactionStatus } from '@/lib/utitls';
const OnRampTransactions = () => {
    const [alltran,setalltran]=useState<any[]>([]);
      const getAll = async () => {
        const data = await getAllOnRampTransactions();
        console.log(data)
        setalltran(data ??[])
      }
      useEffect(()=>{
       getAll();
      },[])
  return (
      <div className="p-10">
            <h1 className='mb-6 text-[20px] font-semibold '>Recent OnRamp transactions</h1>
            <Table className='w-full p-3'>
                <TableHeader>
                  <TableRow className='bg-[#cdc8c8]' >
                    <TableHead className='flex items-center justify-center'>Transaction</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                    <TableHead className='text-center'>Start Date</TableHead>
                    <TableHead className='text-center'>Amount</TableHead>
                    <TableHead className='text-center'>Bank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                      alltran.map((data)=>{
                        const status=getTransactionStatus(new Date(data.date))
                        return(
                           <TableRow className={`${data.type==='credit' ? "bg-[#d8f5c9]":'bg-[#fad2d2]'}`} key={data.key}>
                             <TableCell className="font-medium text-center">{data.type==='credit'? "Withdraw":"Deposite"}</TableCell>
                            <TableCell className='text-center'>Success</TableCell>
                            <TableCell className='text-center'> {formatDateTime(new Date(data.startTime)).dateTime}</TableCell>
                            <TableCell className={data.type==='credit'?"text-[#2dd749] text-center font-semibold text-[18px]":"text-[#fa1d1d] text-[18px] text-center font-semibold"}>{data.type==='credit'? `+${formatAmount(data.amount)}`:`-${formatAmount(data.amount)}`}</TableCell>
                            <TableCell className="text-center">{data.provider}</TableCell>
                           </TableRow>
                        )
                      })
                    }
                </TableBody>
            </Table>
       </div>
  )
}

export default OnRampTransactions
