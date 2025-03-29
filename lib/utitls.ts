// this is used to format the international number in any currdency
import { z } from "zod";
export default function formatAmount(amount: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formatter.format(amount);
  }
export const authformSchema =(type:string)=> z.object({
    firstName:type=="sign-in"? z.string().optional() :z.string(),
    lastName:type=="sign-in"? z.string().optional() :z.string(),
    Address:type=="sign-in"? z.string().optional() :z.string(),
    State:type=="sign-in"? z.string().optional() :z.string(),
    PostalCode:type=="sign-in"? z.string().optional() :z.string().max(6),
    DateOfBirth:type=="sign-in"? z.string().optional() :z.string().max(10),
    SSN:type=="sign-in"? z.string().optional() :z.string().max(4),
    email: z.string().email({message:"Invalid email"}),
    password:z.string().min(8)
})