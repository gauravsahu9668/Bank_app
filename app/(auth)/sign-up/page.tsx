import React from 'react'
import AuthForm from '@/componets/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions'
const SignUp =async() => {
  const loggedInUser=await getLoggedInUser();
  console.log(loggedInUser)
  return (
    <section className='flex items-center justify-center  size-full max-sm:px-6'>
     <AuthForm type="sign-up"></AuthForm>
    </section>
  )
}
export default SignUp