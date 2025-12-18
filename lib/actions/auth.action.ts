"use server";

import User from "@/database/user.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignInSchema, SignUpSchema } from "../validations";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Account from "@/database/account.model";
import { signIn } from "@/auth";
import { UnauthorizedError } from "../http-error";

export const signUpWithCredentials = async (
  params: AuthCredentials
): Promise<ActionResponse> => {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse;

  const { name, email, password, username } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existsUser = await User.findOne({ email });
    if (existsUser) throw new Error("User already exists");

    const existsUsername = await User.findOne({ username });

    if (existsUsername) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create(
      [
        {
          name,
          email,
          username,
        },
      ],
      {
        session,
      }
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          password: hashedPassword,
          provider: "credentials",
          providerAccountId: email,
        },
      ],
      { session }
    );

    session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const signInWithCredentials = async (params: {
  email: string;
  password: string;
}) => {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse;

  const { email, password } = validationResult.params!;

  try {
    const existsUser = await User.findOne({ email });
    if (!existsUser) throw new UnauthorizedError("Invalid credentials");

    const existsAccount = await Account.findOne({
      providerAccountId: email,
    });
    if (!existsAccount) throw new UnauthorizedError("Invalid credentials");

    const isPasswordMatched = await bcrypt.compare(
      password,
      existsAccount.password!
    );
    if (!isPasswordMatched) throw new UnauthorizedError("Invalid credentials");

    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
