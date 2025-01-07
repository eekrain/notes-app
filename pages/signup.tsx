import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkSimple } from "@/components/ui/link";
import { SignupForm, signupFormSchema } from "@/lib/schema";
import React from "react";
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
import { useRouter } from "next/router";
import { API_signUp } from "@/lib/api";

type Props = {};

const SignUpPage = (props: Props) => {
  const router = useRouter();
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: API_signUp,
  });

  const onSubmit = async (values: SignupForm) => {
    const result = await mutateAsync(values);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      router.push("/signin");
    }
  };

  return (
    <div className="container">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create your first account on MyNotes
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                Sign Up
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

export default SignUpPage;
