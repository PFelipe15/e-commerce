import React   from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton, useClerk, useUser } from '@clerk/nextjs';
 
 

const UserNav  = ( ) => {
  const { signOut } = useClerk();
  const {user} = useUser()
  const handleLogout =   () => {
   signOut()
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.imageUrl}
              alt="@stilo20"
            />
            <AvatarFallback>S20</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className={"font-normal bg-primary text-white"}>
          <SignedIn>
            <div className="flex items-center gap-4 ">
            <UserButton />
              <div className="flex flex-col space-y-2">
                <p className="text-base font-medium leading-none">
                  {user?.firstName}
                </p>
                {user && user.primaryEmailAddress && (
                  <p className="text-sm text-black leading-none">
                    {user.primaryEmailAddress.toString()}
                  </p>
                )}
              </div>

             </div>

         
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full flex gap-2">Entrar</Button>
            </SignInButton>
          </SignedOut>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Perfil
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Nossas Lojas <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
      
            
              <DropdownMenuItem>
                Detalhes
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>Novo Produto</DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={"/dummy/seed"}>Apply Dummy Data</Link>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
           
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;