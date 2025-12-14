import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Email is required."),
  password: z.string().nonempty("Password is required."),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),
  email: z.email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character."
    ),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),
  content: z.string().min(1, "Body is required."),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag is required.")
        .max(30, "Tag cannnot exceed 30 characters.")
    )
    .min(1, "At least one tag is required.")
    .max(3, "Maximum 3 tags allowed."),
});
