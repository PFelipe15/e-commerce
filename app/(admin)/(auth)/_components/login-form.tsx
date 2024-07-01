'use client'
import React, { FormEvent, useState } from 'react';
import Logo from '@/components/layout/logo';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {   useToast } from '@/components/ui/use-toast';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { ClerkAPIError } from '@clerk/types';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = React.useState<ClerkAPIError[]>();

    
    
    const { toast } = useToast();

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();



  if (!isLoaded) return null;

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
e.preventDefault();

console.log(email,password)

    try {
        
        const result = await signIn.create({
          identifier: email,
          password,
        });
        console.log(result);
    
        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          router.push('/');
        }
    } catch (error) {
        if (isClerkAPIResponseError(error)){

            return   toast({
                 type: "background",
                 title: "Checkout",
                 description: error.errors[0]?.longMessage,
                 duration: 5000,
               });
        }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
         <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition duration-200"
          >
            Entrar
          </button>
          <div className="mt-4 text-center">
            <a href="#" className="text-primary hover:underline">Esqueceu a senha?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
