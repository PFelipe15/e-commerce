import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "./lib/db";
import {compareSync} from 'bcryptjs'
export const { handlers:{GET,POST}, auth, signOut } = NextAuth({
  
  providers: [Credentials({
    
    credentials:{
      email:{},
      password:{}
    },
  
 async  authorize(credentials){
      const email = credentials.email as string;
      const password = credentials.password as string;

      if (!email || !password) {
        return null;
      }

      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return null;
      }
const match = compareSync(password, user.password ?? '')
if (match){
   return user;
}

return null
}
  })],
});

 
 