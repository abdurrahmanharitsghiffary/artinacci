import React from "react";
import RegisterForm from "./register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Artinacci",
};

export default function Page() {
  return <RegisterForm />;
}
