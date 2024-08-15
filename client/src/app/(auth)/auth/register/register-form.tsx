"use client";

import Divider from "@/components/divider";
import { useRegisterForm } from "@/hooks/validator/use-register-form";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

export default function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRegisterForm();

  return (
    <Form
      className="flex flex-col gap-2 items-center w-full max-w-sm"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="text-center">
        Become a member and start your journey with us. Register now!
      </p>
      <Form.Group controlId="loginForm.FullName" className="w-full">
        <Form.Label className="font-semibold">Fullname</Form.Label>
        <Form.Control
          type="text"
          placeholder="John Doe"
          {...register("fullName")}
          isInvalid={!!errors?.fullName}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.fullName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="loginForm.UserName" className="w-full">
        <Form.Label className="font-semibold">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="johndoe12"
          {...register("username")}
          isInvalid={!!errors?.username}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.username?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="loginForm.Email" className="w-full">
        <Form.Label className="font-semibold">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          isInvalid={!!errors?.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="loginForm.Password" className="w-full">
        <Form.Label className="font-semibold">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="********"
          {...register("password")}
          isInvalid={!!errors?.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="w-full !rounded-full" type="submit">
        Register
      </Button>
      <Divider>or</Divider>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/oauth/google`}
        className="w-full no-underline"
      >
        <Button
          className="w-full !flex justify-center gap-2 items-center !rounded-full"
          variant="light"
        >
          <FcGoogle size={20} /> Continue with Google
        </Button>
      </Link>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/oauth/facebook`}
        className="w-full no-underline"
      >
        <Button
          className="w-full !flex justify-center gap-2 items-center !rounded-full"
          variant="light"
        >
          <ImFacebook2 size={20} />
          Continue with Facebook
        </Button>
      </Link>
      <p>
        Already have an account? <Link href="/auth/login">Login Here</Link>
      </p>
    </Form>
  );
}
