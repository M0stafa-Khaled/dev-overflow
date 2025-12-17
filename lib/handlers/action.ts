"use server";

import { ZodError } from "zod";
import { ZodSchema } from "zod/v3";
import { UnauthorizedError, ValidationError } from "../http-error";
import { Session } from "next-auth";
import { auth } from "@/auth";
import connectDB from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema;
  authorize?: boolean;
};

const action = async <T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) => {
  // Check schema validation
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();
    if (!session) return new UnauthorizedError();
  }

  await connectDB();

  return {
    params,
    session,
  };
};

export default action;
