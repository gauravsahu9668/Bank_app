import React from 'react'
import AuthForm from '@/componets/AuthForm'
const signIn = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-in"></AuthForm>
    </section>
  )
}
export default signIn
