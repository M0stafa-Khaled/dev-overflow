import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import connectDB from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

/**
 *
 * @docs GET /api/users
 */
export const GET = async () => {
  try {
    await connectDB();

    const users = await User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs POST /api/users
 */
export const POST = async (req: Request) => {
  try {
    connectDB();

    const body = await req.json();

    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    const existsUser = await User.findOne({ email });
    if (existsUser) throw new Error("User already exists.");

    const existsUsername = await User.findOne({ username });
    if (existsUsername) throw new Error("Username already exists.");

    const newUser = await User.create(validatedData.data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
