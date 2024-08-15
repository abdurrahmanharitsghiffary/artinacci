import React from "react";
import LoginForm from "./login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ArtiNacci",
};

export default function Page() {
  return <LoginForm />;
}
