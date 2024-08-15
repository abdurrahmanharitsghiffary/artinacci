-- CreateTable
CREATE TABLE "codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "codes_code_key" ON "codes"("code");

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
