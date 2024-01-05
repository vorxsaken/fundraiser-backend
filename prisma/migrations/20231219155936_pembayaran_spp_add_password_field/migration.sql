/*
  Warnings:

  - Added the required column `passwors` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "passwors" VARCHAR(255) NOT NULL;
