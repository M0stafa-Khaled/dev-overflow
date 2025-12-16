import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-error";
import connectDB from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

/**
 *
 * @docs GET /api/accounts/:id
 */
export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account not found");
  try {
    await connectDB();

    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("Account not found");
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs PUT /api/accounts/:id
 */
export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("User not found");

  try {
    await connectDB();

    const validatedData = AccountSchema.safeParse(await req.json());
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { provider, providerAccountId } = validatedData.data;

    const existsAccountByProvider = await Account.findOne({ provider });
    if (
      existsAccountByProvider &&
      existsAccountByProvider._id.toString() !== id
    )
      throw new Error("Account already exists.");

    const existsAccountByProviderAccountId = await Account.findOne({
      providerAccountId,
    });
    if (
      existsAccountByProviderAccountId &&
      existsAccountByProviderAccountId._id.toString() !== id
    )
      throw new Error("Account already exists.");

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validatedData.data,
      {
        new: true,
      }
    );
    if (!updatedAccount) throw new NotFoundError("Account not found");

    return NextResponse.json(
      {
        success: true,
        message: "Account updated successfully",
        data: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

/**
 *
 * @docs DELETE /api/accounts/:id
 */
export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) throw new NotFoundError("Account not found");

  try {
    await connectDB();

    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account not found");

    return NextResponse.json(
      { success: true, message: "Account deleted successfully", data: account },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
