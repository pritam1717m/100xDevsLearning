import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider  from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            
            return {
                id: "user1",
                name : "afkfnkfe"
            };
        },
      }),
      GoogleProvider({
        clientId : process.env.GOOGLE_ID as string,
        clientSecret : process.env.GOOGLE_SECRET as string
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages : {
    signIn : '/signup'
  }
})

export { handler as GET, handler as POST }