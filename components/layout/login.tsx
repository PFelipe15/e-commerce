'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {signIn} from 'next-auth/react'
import { useState } from "react"
import { SignInButton } from "@clerk/nextjs"
 export function Login() {
  const [error, setError] = useState<string | null>(null);
 
  function handleSubmit(Event:React.FormEvent<HTMLFormElement>) {
    Event.preventDefault()
    const formData = new FormData(Event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    signIn('credentials', {email,password ,redirect:false, callbackUrl:'/'} ).then((res)=>{
     
      if (res && res.error === 'CredentialsSignin'){
        setError("Email e/ou Senha Inválidas")
      }

      
    })
  }

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SignInButton mode="modal">
          <Button className="w-full flex gap-2">Entrar</Button>
        </SignInButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fazer Login</DialogTitle>
          <DialogDescription>
            Informe seu email e senha para fazer login no site
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@example.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="col-span-3"
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center justify-center my-2">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="flex gap-4 justify-end">
            <DialogFooter>
              <Button type="submit">Entrar</Button>
            </DialogFooter>
            <DialogFooter>
              <Link href={"/register"}>Criar Conta</Link>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
