import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";

import * as routes from "@src/routes";

export default function ResetPasswordPage() {
  const form = useForm({
    email: "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    form.transform((data: any) => ({
      user: { email: data.email },
    }));
    form.post(routes.user_password());
  };

  return (
    <>
      <Head title="Reset Password" />

      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {processing ? "Loading..." : "Reset password"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href={routes.new_user_session()} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </>
  );
}
