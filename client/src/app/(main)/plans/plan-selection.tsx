"use client";
import { useGetProfile } from "@/hooks/api/get-profile";
import { useUpgradePlan } from "@/hooks/api/upgrade-plan";
import Link from "next/link";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { LiaCheckCircle } from "react-icons/lia";

const planMapping = {
  A: 1,
  B: 2,
  C: 3,
};

type PlanKey = keyof typeof planMapping;

export default function PlanSelection() {
  const { data } = useGetProfile();
  const { mutateAsync } = useUpgradePlan();

  const membershipType = data?.data?.membership?.type ?? "A";

  const getPlanButtonLabel = (planType: PlanKey) => {
    return planMapping[planType] >= planMapping[membershipType as PlanKey]
      ? "Choose plan"
      : "Downgrade plan";
  };

  const getIsUpgradeAndDowngradeAvailable = (planType: PlanKey) => {
    return planMapping[planType] !== planMapping[membershipType as PlanKey];
  };

  const handleBasicPlanSelect = async () => {
    await mutateAsync({ planType: "A" });
  };

  const handleMemberPlanSelect = async () => {
    await mutateAsync({ planType: "B" });
  };

  const handleCreatorPlanSelect = async () => {
    await mutateAsync({ planType: "C" });
  };

  return (
    <>
      <div className="flex gap-4 w-[90%] flex-col md:flex-row">
        <Card className="text-center flex-1">
          <Card.Body className="flex flex-col">
            <Card.Title className="!font-bold">Basic</Card.Title>
            <Card.Title>
              Free {membershipType === "A" && "(Current)"}
            </Card.Title>
            <Card.Text>
              Get started with limited access to 3 hand-picked articles and
              videos. Perfect for those exploring our content for the first
              time.
            </Card.Text>
            {getIsUpgradeAndDowngradeAvailable("A") && (
              <Button
                variant="primary"
                className="mt-auto"
                onClick={handleBasicPlanSelect}
              >
                {getPlanButtonLabel("A")}
              </Button>
            )}
          </Card.Body>
          <Card.Footer className="bg-white text-muted flex flex-col gap-2 px-4 text-sm">
            <Card.Text className="!flex gap-2 items-center">
              Access to 3 articles and videos
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              Basic community forum access
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              Occasional newsletter updates
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              Limited customer support
            </Card.Text>
          </Card.Footer>
        </Card>
        <Card className="text-center flex-1">
          <Card.Body className="flex flex-col">
            <Card.Title className="!font-bold">
              Member {membershipType === "B" && "(Current)"}
            </Card.Title>
            <Card.Title>$10/month</Card.Title>
            <Card.Text>
              Unlock access to up to 10 exclusive articles and videos. Perfect
              for casual learners.
            </Card.Text>
            {getIsUpgradeAndDowngradeAvailable("B") && (
              <Button
                variant="primary"
                className="mt-auto"
                onClick={handleMemberPlanSelect}
              >
                {getPlanButtonLabel("B")}
              </Button>
            )}
          </Card.Body>
          <Card.Footer className="bg-white text-muted flex flex-col gap-2 px-4 text-sm">
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Access to up to 10 articles and videos
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Ad-free experience
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Monthly newsletter with tips and insights
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Community forum access
            </Card.Text>
          </Card.Footer>
        </Card>

        <Card className="text-center flex-1">
          <Card.Body className="flex flex-col">
            <Card.Title className="!font-bold">
              Creator {membershipType === "C" && "(Current)"}
            </Card.Title>
            <Card.Title>$20/month</Card.Title>
            <Card.Text>
              Enjoy unlimited access to all content and exclusive creator tools.
              Ideal for serious enthusiasts and content creators.
            </Card.Text>
            {getIsUpgradeAndDowngradeAvailable("C") && (
              <Button
                variant="primary"
                className="mt-auto"
                onClick={handleCreatorPlanSelect}
              >
                {getPlanButtonLabel("C")}
              </Button>
            )}
          </Card.Body>
          <Card.Footer className="bg-white text-muted flex flex-col gap-2 px-4 text-sm">
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Unlimited access to all articles and videos
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Early access to new content
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Access to creator tools and resources
            </Card.Text>
            <Card.Text className="!flex gap-2 items-center">
              <LiaCheckCircle className="text-success" />
              Priority support and feedback
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>

      <Link href="/home">
        {membershipType === "A" ? "Continue with basic plan" : "Continue"}
      </Link>
    </>
  );
}
