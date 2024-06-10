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
		<div className="flex min-h-screen flex-col items-center justify-between">
			<Card className="w-[350px] flex justify-center flex-column">
				<CardHeader>
					<CardTitle>Heads Up!</CardTitle>
					<CardDescription>Not Signed In</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-between">
					<Button onClick={() => signIn()}>Sign in</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
