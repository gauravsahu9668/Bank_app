"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createP2Ptransaction } from "@/lib/actions/wallet.transactions"
import { getAllPeerTRansactions } from "@/lib/actions/wallet.transactions"
import { useState } from "react"
import formatAmount from "@/lib/utitls"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import { formatDateTime } from "@/lib/utitls"
import { getLoggedInUser } from "@/lib/actions/user.actions"
const FormSchema = z.object({
   amount: z.string({required_error: "Please enter the amount.",}),
   Email:z.string({required_error:"Please select a bank"}).email(),
   note:z.string({required_error:"Please enter additional details"})
})
const  Deposite=({currentBalance,inputTitle,type,buttonTitle}:InputBoxProps)=> {
    if(currentBalance===0){
        return (
            <div>
                No money to deposite to bank
            </div>
        )
    }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit=async(data: z.infer<typeof FormSchema>)=>{
     const details=await createP2Ptransaction(data.amount,data.Email,data.note);
  }
  const [alltran, setalltran] = useState<{ balance: any[]; senderId?: string }>({ balance: [] });
const getAll = async () => {
  const data = await getAllPeerTRansactions();
  console.log(data);
  setalltran(data ?? { balance: [] });
};
useEffect(() => {
  getAll();
}, []);
  return (
    // <div>
    //   <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
    //     <FormField
    //       control={form.control}
    //       name="amount"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Amount To Transfer</FormLabel>
    //             <Input placeholder='enter amount here'onChange={field.onChange}></Input>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="Email"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Email</FormLabel>
    //             <Input placeholder='enter receiver email address'onChange={field.onChange}></Input>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="note"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Additional Details</FormLabel>
    //             <Input placeholder='enter additional details'onChange={field.onChange}></Input>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Transfer</Button>
    //   </form>
    //    </Form>
    //    <div className="p-10">
    //         <h1>Recent transactions</h1>
    //         <Table>
    //             <TableCaption>A list of your recent invoices.</TableCaption>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead>Receiver Email</TableHead>
    //                 <TableHead>Status</TableHead>
    //                 <TableHead>Date</TableHead>
    //                 <TableHead>Amount</TableHead>
    //                 <TableHead >Note</TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //                 { 
    //                   alltran.map((data)=>{
    //                     return(
    //                        <TableRow key={data.key}>
    //                          <TableCell className="font-medium">{data.recieverEmail}</TableCell>
    //                         <TableCell>{data.status}</TableCell>
    //                         <TableCell> {formatDateTime(new Date(data.date)).dateTime}</TableCell>
    //                         <TableCell className="text-right">{formatAmount(data.amount)}</TableCell>
    //                         <TableCell className="text-right">{data.Note}</TableCell>
    //                        </TableRow>
    //                     )
    //                   })
    //                 }
    //             </TableBody>
    //         </Table>
    //    </div>
    // </div>
    <div className="p-6 w-full min-h-screen mx-auto bg-white shadow-md rounded-lg">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Amount To Transfer</FormLabel>
            <Input className="mt-1 p-2 border rounded-md w-full" placeholder='Enter amount here' onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Email</FormLabel>
            <Input className="mt-1 p-2 border rounded-md w-full" placeholder='Enter receiver email address' onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">Additional Details</FormLabel>
            <Input className="mt-1 p-2 border rounded-md w-full" placeholder='Enter additional details' onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit"  className="w-fit mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">Transfer</Button>
    </form>
  </Form>
  <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-xl font-bold mb-4">Recent Transactions</h1>
    <Table className="w-full border border-gray-300 rounded-md">
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead  className="flex items-center justify-center">Receiver Email</TableHead>
          <TableHead  className='text-center'>Note</TableHead>
          <TableHead  className='text-center'>Date</TableHead>
          <TableHead  className='text-center'>Status</TableHead>
          <TableHead  className='text-center'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alltran.balance.map((data) => {
          const type=alltran.senderId===data.senderId;
          return (
            <TableRow className={`${!type ? "bg-[#dbf9cb]":'bg-[#fce5e5]'}`} key={data.key}>
            <TableCell className="p-2 text-center font-medium">{data.recieverEmail}</TableCell>
            <TableCell className="p-2 text-center">{data.Note}</TableCell>
            <TableCell className="p-2 text-center">{formatDateTime(new Date(data.date)).dateTime}</TableCell>
            <TableCell className="p-2 text-center">
            <div className="rounded-full px-2 py-1">
                {data.status}
            </div>
            </TableCell>
            <TableCell className={`${!type?"text-center font-semibold text-[18px] text-[#2dd749]":"text-center text-[18px] font-semibold text-[#fa1d1d]"}`}>{!type ? `+${formatAmount(data.amount)}`:`-${formatAmount(data.amount)}`}</TableCell>
          </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </div>
</div>
  )
}
export default Deposite

