import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2 min-h-[100dvh] items-center justify-center">
      <h1 className="text-[6rem] font-bold">404</h1>
      <p>Sorry we could&apos;nt find this page.</p>
      <Link href="/home">
        <Button>Back to homepage?</Button>
      </Link>
    </div>
  );
}
