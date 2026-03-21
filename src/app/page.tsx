import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">SaaS Harness Template</CardTitle>
          <CardDescription>AI-Native SaaS Starter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Multi-tenant SaaS foundation with harness engineering.
          </p>
          <div className="flex gap-2">
            <Link
              href="/auth/sign-in"
              className={cn(buttonVariants({ variant: "default" }), "flex-1")}
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
