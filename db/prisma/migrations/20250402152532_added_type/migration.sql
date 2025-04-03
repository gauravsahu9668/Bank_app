-- DropIndex
DROP INDEX "OnRampTransaction_userId_key";

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'credit';
