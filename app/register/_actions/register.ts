'use server'
import db from "@/lib/db";
import {hashSync} from 'bcryptjs'
import { redirect } from "next/navigation";
export interface RegisterActionPros {
  UserData: {
    email: string;
    password: string;
    phone: string;
    name: string;
  };
  AddressData: {
    street: string;
    numberHouse: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default async function RegisterAction({ UserData, AddressData }: RegisterActionPros) {
   const { email, password, phone, name } = UserData;
  const { street, numberHouse, city, state, zipCode } = AddressData;

  if (
    !email ||
    !password ||
    !street ||
    !numberHouse ||
    !city ||
    !state ||
    !zipCode
  ) {
     throw new Error("Todos os campos devem ser preenchidos");
 
    }
 

 

  redirect('/')
}
