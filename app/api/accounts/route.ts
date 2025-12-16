import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-error";
import connectDB from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

/**
 *
 * @docs GET /api/accounts
 */
export const GET = async () => {
  try {
    await connectDB();

    const accounts = await Account.find();
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs POST /api/accounts
 */
export const POST = async (req: Request) => {
  try {
    connectDB();

    const body = await req.json();

    const validatedData = AccountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { providerAccountId, provider } = validatedData.data;

    const existsAccount = await Account.findOne({
      providerAccountId,
      provider,
    });
    if (existsAccount)
      throw new ForbiddenError("An account the same provider elready exists");

    const newAccount = await Account.create(validatedData.data);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
