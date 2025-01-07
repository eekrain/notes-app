import { z } from "zod";

export const signinFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});
export type SigninForm = z.infer<typeof signinFormSchema>;

export const signupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email("Must be a valid email"),
});
export type SignupForm = z.infer<typeof signupFormSchema>;
