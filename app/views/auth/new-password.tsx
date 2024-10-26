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

export default function ResetPasswordPage({ reset_password_token }: any) {
  const form = useForm({
    password: "",
    password_confirmation: "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    form.transform((data: any) => ({
      user: {
        password: data.password,
        password_confirmation: data.password_confirmation,
        reset_password_token: reset_password_token,
      },
    }));
    form.put(routes.user_password());
  };

  return (
    <>
      <Head title="Create new password" />

      <CardHeader>
        <CardTitle className="text-2xl">Create new password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {processing ? "Loading..." : "Change password"}
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
