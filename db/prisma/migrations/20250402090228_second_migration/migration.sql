/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WalletUser" ALTER COLUMN "id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_userId_key" ON "OnRampTransaction"("userId");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WalletUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "WalletUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
