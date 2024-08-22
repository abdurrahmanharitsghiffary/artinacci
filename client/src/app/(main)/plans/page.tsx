import React from "react";
import { Metadata } from "next";
import PlanSelection from "./_components/plan-selection";

export const metadata: Metadata = {
  title: "Plans | Artinacci",
};

export default function Page() {
  return (
    <>
      <h1 className="font-bold">Artinacci</h1>
      <h2 className="font-bold">Choose your plans!</h2>
      <PlanSelection />
    </>
  );
}
