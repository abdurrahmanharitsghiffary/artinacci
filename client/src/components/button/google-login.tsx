import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  return (
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
  );
}
