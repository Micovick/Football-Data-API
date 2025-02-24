/*
  Warnings:

  - Added the required column `areaName` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaName` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "areaName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "areaName" TEXT NOT NULL;
