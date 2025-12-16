import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import connectDB from "@/lib/mongoose";
import { signInWithOAuthSchema } from "@/lib/validations";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req: Request) => {
  const { provider, providerAccountId, user } = await req.json();

  await connectDB();

  const session = await mongoose.startSession({});
  session.startTransaction();
  try {
    const validatedData = signInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existsUser = await User.findOne({ email }).session(session);

    if (!existsUser) {
      [existsUser] = await User.create(
        [
          {
            name,
            username: slugifiedUsername,
            email,
            image,
          },
        ],
        { session }
      );
    } else {
      const updatedData: { name?: string; image?: string } = {};

      if (existsUser.name !== name) updatedData.name = name;
      if (existsUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existsUser._id },
          { $set: updatedData }
        ).session(session);
      }
    }

    // account
    const existsAccount = await Account.findOne({
      userId: existsUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existsAccount) {
      await Account.create(
        [{ userId: existsUser._id, provider, providerAccountId, name, image }],
        { session }
      );
    }

    await session.commitTransaction();

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
};
