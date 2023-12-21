
import NextAuth from "next-auth/next"
declare module 'next-auth' {
    interface Session {
        papel?: string | null 
    }
    interface User {
        papel?: string | null
    }
}

declare module 'next-auth/jwt'{
    interface JWT {
        papel?: string | null
    }
}