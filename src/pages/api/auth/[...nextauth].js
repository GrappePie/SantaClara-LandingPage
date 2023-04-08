import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { dbConnect } from "@/utils/mongoose"

dbConnect()

export default NextAuth({
    //adapter: MongoDBAdapter(process.env.MONGODB_URI),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request){
                const username = credentials.username;
                const password = credentials.password;
                if (!username || !password) {
                    console.log("Missing username or password");
                    throw new Error("Missing username or password");
                }
                 const user = await User.findOne({ username });
                    if (!user) {
                        console.log("No user found");
                        throw new Error("No user found");
                    }
                    const isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) {
                        console.log("Invalid password");
                        throw new Error("Invalid password");
                    }
                    return user;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    theme: {
        colorScheme: "light",
    }
});