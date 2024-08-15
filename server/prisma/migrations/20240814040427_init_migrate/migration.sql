-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('ARTICLE', 'VIDEO');

-- CreateEnum
CREATE TYPE "MembershipType" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(150) NOT NULL,
    "username" VARCHAR(125) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "avatarUrl" TEXT,
    "providerId" TEXT,
    "providerType" "ProviderType",
    "membershipType" "MembershipType" NOT NULL DEFAULT 'A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "descritpion" TEXT,
    "type" "ContentType" NOT NULL,
    "attachments" TEXT[],
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
