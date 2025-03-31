import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import formatAmount, {  getTransactionStatus, removeSpecialCharacters } from '@/lib/utitls'
import { formatDateTime } from '@/lib/utitls'
import { PaymentChannel } from 'plaid'
import { cn } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants'
const CategoryBadge=({category}:CategoryBadgeProps)=>{
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor,
    }=transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
    return (
        <div className={`flex items-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2 ${textColor} ${chipBackgroundColor } ${borderColor} ${backgroundColor}`}>
            <div className={cn('rounded-full')}>
                <p className={cn('text-[12px] font-medium')}>
                    {category}
                </p>
            </div>
        </div>
    )
}
const Transactions = ({transactions}:TransactionHistoryTableProps)=> {
  return (
    <Table>
         <TableHeader className='bg-[#f9fafb]'>
           <TableRow>
               <TableHead className="px-2">Transaction</TableHead>
               <TableHead className="px-2">Amount</TableHead>
               <TableHead className="px-2">Status</TableHead>
               <TableHead className="px-2">Date</TableHead>
               <TableHead className="px-2 max-md:hidden">Channel</TableHead>
               <TableHead className="px-2 max-md:hidden">Category</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
            {
                transactions.map((t)=>{
                    const status=getTransactionStatus(new Date(t.date))
                    const amount=formatAmount(t.amount)
                    const isDebit=t.type==='debit';
                    const isCredit=t.type==="credit"
                    return (
                        <TableRow key={t.id} className={`${isDebit || amount[0] ==='-'? "bg-[#fbeae6]" : "bg-[#d9fbe5]"} !over:bg-none`}>
                            <TableCell className='max-w-[250px] pl-2'>
                                <div className='flex items-center gap-3'>
                                    <h1 className='text-14 truncate font-semibold text-[#344054]'>{removeSpecialCharacters(t.name)}</h1>
                                </div>   
                            </TableCell>
                            <TableCell className={`pl-2 pr-10 font-semibold ${isDebit ||amount[0]==='-'? "text-[#f04438]" : "text-[#039855]"}`}>
                                 {isDebit ? `-${amount}`: isCredit ? amount:amount}
                            </TableCell>
                            <TableCell className='pl-2 pr-10'>
                                <CategoryBadge category={status}></CategoryBadge>
                            </TableCell>
                            <TableCell className='pl-2 pr-10 min-w-32'>
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className='pl-2 pr-10 capitalize'>
                                {t.paymentChannel}
                            </TableCell>
                            <TableCell className='pl-2 pr-10 max-md:hidden'>
                            <CategoryBadge category={t.name}></CategoryBadge>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
         </TableBody>
    </Table>

  )
}
export default Transactions
