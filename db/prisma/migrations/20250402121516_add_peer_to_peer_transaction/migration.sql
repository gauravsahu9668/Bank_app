/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- AlterTable
ALTER TABLE "WalletUser" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Balance";

-- CreateTable
CREATE TABLE "PeerToPeerTransactions" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Success',
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "Note" TEXT NOT NULL,
    "recieverEmail" TEXT NOT NULL,

    CONSTRAINT "PeerToPeerTransactions_pkey" PRIMARY KEY ("id")
);
