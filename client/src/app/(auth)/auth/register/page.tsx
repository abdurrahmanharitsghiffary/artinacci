import React from "react";
import RegisterForm from "./register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | ArtiNacci",
};

export default function Page() {
  return <RegisterForm />;
}
