 import React from 'react';
import LoginForm from '../_components/login-form';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
 
export default function Login() {

  const { userId } = auth()
  if(userId){
    redirect("/")
  }
  return (
 <main>
  <LoginForm/>
 </main>
  );
}