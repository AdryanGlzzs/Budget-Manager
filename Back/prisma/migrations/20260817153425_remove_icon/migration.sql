/*
  Warnings:

  - You are about to drop the column `icon` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "icon";
