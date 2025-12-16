import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-error";
import connectDB from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

/**
 *
 * @docs GET /api/users/:id
 */
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("User not found");
  try {
    await connectDB();

    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs PUT /api/users/:id
 */
export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("User not found");

  try {
    await connectDB();

    const validatedData = UserSchema.safeParse(await req.json());
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    const existsUser = await User.findOne({ email });
    if (existsUser && existsUser._id.toString() !== id)
      throw new Error("User already exists.");

    const existsUsername = await User.findOne({ username });
    if (existsUsername && existsUsername._id.toString() !== id)
      throw new Error("Username already exists.");

    const updatedUser = await User.findByIdAndUpdate(id, validatedData.data, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError("User not found");

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs DELETE /api/users/:id
 */
export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("User not found");

  try {
    await connectDB();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User not found");

    return NextResponse.json(
      { success: true, message: "User deleted successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
