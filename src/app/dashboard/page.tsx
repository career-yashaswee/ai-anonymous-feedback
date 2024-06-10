"use client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Terminal } from "lucide-react";

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<div className="flex justify-center align-center">
			<Card className="w-[350px] flex justify-center flex-column">
				<CardHeader>
					<CardTitle>Dashboard</CardTitle>
					<CardDescription>Welcome to Dashboard</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
}
