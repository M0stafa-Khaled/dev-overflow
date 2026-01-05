import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("Password is required").nonempty("Password is required"),
});

export const SignUpSchema = z.object({
  username: z
    .string("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
});

export const signInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string("Provider account ID is required")
    .min(1, "Provider account ID is required"),
  user: z.object({
    name: z.string("Name is required").min(1, "Name is required"),
    username: z
      .string("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    image: z.url("Please provide a valid URL").optional(),
  }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string("Title is required")
    .min(5, "Title must be at least 5 characters.")
    .max(130, "Title cannot exceed 130 characters"),
  content: z.string().min(100, "Minimum of 100 characters."),
  tags: z
    .array(
      z
        .string("Tag is required")
        .min(1, "Tag is required")
        .max(30, "Tag cannnot exceed 30 characters")
    )
    .min(1, "At least one tag is required")
    .max(3, "Maximum 3 tags allowed"),
});

export const UpdateQuestionSchema = AskQuestionSchema.extend({
  questionId: z
    .string("Question ID is required")
    .min(1, "Question ID is required"),
});

export const UserSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  username: z
    .string("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.email("Invalid email address"),
  bio: z.string("Bio must be a string").optional(),
  image: z.url("Please provide a valid URL").optional(),
  location: z.string("Location must be a string").optional(),
  portfolio: z.url("Plase provide a valid URL").optional(),
  reputation: z.number("Reputation must be a number").optional(),
});

export const AccountSchema = z.object({
  userId: z.string("User ID is required").min(1, "User ID is required"),
  name: z.string("Name is required").min(1, "Name is required"),
  image: z.url("Please provide a valid URL").optional(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
    .optional(),
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string("Provider account ID is required")
    .min(1, "Provider account ID is required"),
});

export const GetQuestionSchema = z.object({
  questionId: z
    .string("Question ID is required")
    .min(1, "Question ID is required"),
});

export const PaginatedSearchSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().optional().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionSchema = PaginatedSearchSchema.extend({
  tagId: z.string("Tag ID is required").min(1, "Tag ID is required"),
});

export const IncrementViewsSchema = z.object({
  questionId: z
    .string("Question ID is required")
    .min(1, "Question ID is required"),
});

export const AnswerSchema = z.object({
  content: z.string().min(3, "Answer has to have more than 3 characters"),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z
    .string("Question ID is required")
    .min(1, "Question ID is required"),
});

export const GetAnswersSchema = PaginatedSearchSchema.extend({
  questionId: z
    .string("Question ID is required")
    .min(1, "Question ID is required"),
});

export const AIAnswerSchema = z.object({
  question: z
    .string("Qestion is required")
    .min(5, "Question is required")
    .max(130, "Question cannot exceed 130 characters"),
  content: z
    .string("Question description is required.")
    .min(100, "Question description must have Minimum of 100 characters."),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, "Target ID is required"),
  targetType: z.enum(
    ["question", "answer"],
    "Invalid target type. Must be 'question' or 'answer'."
  ),
  voteType: z.enum(
    ["upvote", "downvote"],
    "Invalid vote type. Must be 'upvote' or 'downvote'."
  ),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z
    .number()
    .int()
    .min(-1, "Change must be -1 (decrement) or 1 (increment)")
    .max(1, "Change must be -1 (decrement) or 1 (increment)"),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CreateInteractionSchema = z.object({
  action: z.enum([
    "view",
    "upvote",
    "downvote",
    "bookmark",
    "post",
    "edit",
    "delete",
    "search",
  ]),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1),
  authorId: z.string().min(1),
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, "Answer ID is required"),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUserQuestionsSchema = PaginatedSearchSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUsersAnswersSchema = PaginatedSearchSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const GlobalSearchSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});
