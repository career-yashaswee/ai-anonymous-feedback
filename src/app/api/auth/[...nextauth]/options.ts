import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { error } from "console";
import { use } from "react";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any, req): Promise<any> {
				await dbConnect();
				try {
					const user = await UserModel.findOne({
						$or: [
							{
								email: credentials.identifier.email,
							},
							{
								username: credentials.identifier.username,
							},
						],
					});
					if (!user) {
						throw new Error("No User Found with this email");
					}
					if (!user.isVerified) {
						throw new Error("Kindly Verify your Account First");
					}
					const isPasswordCorrect = await bcrypt.compare(
						user.password,
						credentials.password
					);
					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error("Incorrect Password");
					}
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
	],
	callbacks: {
		async session({ session, user, token }) {
			if (token) {
				session.user._id = token.id?.toString();
				session.user.isVerified = token.isVerified;
				session.user.isAcceptingMessages = token.isAcceptingMessages;
				session.user.username = token.username;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token._id = user.id?.toString();
				token.isVerified = user.isVerified;
				token.isAcceptingMessages = user.isAcceptingMessages;
				token.username = user.username;
			}
			return token;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
