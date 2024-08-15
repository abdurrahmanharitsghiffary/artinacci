import React from "react";
import { Metadata } from "next";
import PlanSelection from "./plan-selection";

export const metadata: Metadata = {
  title: "Plans | ArtiNacci",
};

export default function Page() {
  return (
    <>
      <h1 className="font-bold">ArtiNacci</h1>
      <h2 className="font-bold">Choose your plans!</h2>
      <PlanSelection />
    </>
  );
}
