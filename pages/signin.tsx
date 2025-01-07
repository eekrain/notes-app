import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkSimple } from "@/components/ui/link";
import { SigninForm, signinFormSchema } from "@/lib/schema";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { API_signIn } from "@/lib/api";
import { AuthContext } from "@/components/AuthProvider";

type Props = {};

const SignInPage = (props: Props) => {
  const form = useForm<SigninForm>({
    resolver: zodResolver(signinFormSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["signup"],
    mutationFn: API_signIn,
  });

  const { signIn } = useContext(AuthContext);

  async function onSubmit(values: SigninForm) {
    const result = await mutateAsync(values);
    console.log("🚀 ~ onSubmit ~ result:", result);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      signIn(result.data?.token!);
    }
  }

  return (
    <div className="container">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Let's sign in and manage your notes on MyNotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-8 max-w-sm mx-auto"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mx-auto" type="submit">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm flex justify-center">
          <p>Do not have an account?</p>&nbsp;
          <LinkSimple href="/signup" className="inline-block">
            Register Here
          </LinkSimple>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
