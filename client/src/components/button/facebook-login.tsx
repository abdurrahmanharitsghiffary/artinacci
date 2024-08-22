import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { ImFacebook2 } from "react-icons/im";

export default function FacebookLogin() {
  return (
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
  );
}
