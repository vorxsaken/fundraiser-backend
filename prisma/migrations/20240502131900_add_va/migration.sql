/*
  Warnings:

  - Added the required column `virtual_number` to the `DraftTagihan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DraftTagihan" ADD COLUMN     "virtual_number" VARCHAR(100) NOT NULL;
