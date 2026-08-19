-- CreateTable
CREATE TABLE "SavingGoal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "target" DECIMAL(10,2) NOT NULL,
    "current" DECIMAL(10,2) NOT NULL,
    "color" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "SavingGoal_pkey" PRIMARY KEY ("id")
);
