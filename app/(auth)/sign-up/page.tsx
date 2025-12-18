"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      defaultValues={{
        name: "",
        username: "",
        email: "",
        password: "",
      }}
      schema={SignUpSchema}
      formType="SIGN_UP"
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
