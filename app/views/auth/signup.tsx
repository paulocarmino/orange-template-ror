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

export default function SingupPage() {
  const form = useForm({
    full_name: "",
    email: "",
    password: "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    form.transform((data: any) => ({
      user: {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
      },
    }));
    form.post(routes.user_registration());
  };

  return (
    <>
      <Head title="Sign Up" />

      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="John Doe"
                value={data.full_name}
                onChange={(e) => setData("full_name", e.target.value)}
                required
              />
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {processing ? "Loading..." : "Create a account"}
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
