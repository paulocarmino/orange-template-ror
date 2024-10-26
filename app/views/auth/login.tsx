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

export default function LoginPage() {
  const form = useForm({
    email: "",
    password: "",
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    form.transform((data: any) => ({
      user: { email: data.email, password: data.password },
    }));
    form.post(routes.user_session());
  };

  return (
    <div className="flex justify-center items-center px-4 w-full h-screen">
      <Head title="Login" />

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="inline-block ml-auto text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {processing ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href={routes.new_user_registration()} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
