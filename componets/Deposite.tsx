"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createOnRampTransaction } from "@/lib/actions/wallet.transactions"

const FormSchema = z.object({
   amount: z.string({required_error: "Please enter the amount.",}),
   Url:z.string({required_error:"Please select a bank"})
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
    const details=await createOnRampTransaction(data.amount,data.Url,type);
    window.location.href=data.Url||""
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{inputTitle}</FormLabel>
                <Input placeholder='enter amount here'onChange={field.onChange}></Input>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your Bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="https://netbanking.hdfcbank.com">HDFC Bank</SelectItem>
                  <SelectItem value="https://www.axisbank.com/">Axis Bank</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonTitle}</Button>
      </form>
    </Form>
  )
}
export default Deposite

