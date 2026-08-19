/*
  Warnings:

  - You are about to drop the `SavingGoal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SavingGoal";

-- CreateTable
CREATE TABLE "savingGoals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "target" DECIMAL(10,2) NOT NULL,
    "current" DECIMAL(10,2) NOT NULL,
    "color" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "savingGoals_pkey" PRIMARY KEY ("id")
);
