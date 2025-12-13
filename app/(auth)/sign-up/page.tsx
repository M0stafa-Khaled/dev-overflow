"use client";
import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      defaultValues={{ username: "", name: "", email: "", password: "" }}
      schema={SignUpSchema}
      formType="SIGN_UP"
      onSubmit={(data) => Promise.resolve({ success: true })}
    />
  );
};

export default SignUp;
