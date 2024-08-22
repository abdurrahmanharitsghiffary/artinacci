"use client";

import Divider from "@/components/divider";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useLoginForm } from "@/hooks/validator/use-login-form";
import GoogleLogin from "@/components/button/google-login";
import FacebookLogin from "@/components/button/facebook-login";

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useLoginForm();

  return (
    <Form
      className="flex flex-col gap-2 items-center w-full max-w-sm"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="text-center">Welcome, please login to your account.</p>
      <GoogleLogin />
      <FacebookLogin />
      <Divider>or</Divider>
      <Form.Group controlId="loginForm.Email" className="w-full">
        <Form.Label className="font-semibold">Email address</Form.Label>
        <Form.Control
          isInvalid={!!errors?.email}
          type="email"
          placeholder="name@example.com"
          {...register("email")}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="loginForm.Password" className="w-full">
        <Form.Label className="font-semibold">Password</Form.Label>
        <Form.Control
          isInvalid={!!errors?.password}
          type="password"
          placeholder="********"
          {...register("password")}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="w-full !rounded-full" type="submit">
        Login
      </Button>
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/auth/register">Register Here</Link>
      </p>
    </Form>
  );
}
