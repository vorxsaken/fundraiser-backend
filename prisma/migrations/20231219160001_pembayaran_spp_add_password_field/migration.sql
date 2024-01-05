/*
  Warnings:

  - You are about to drop the column `passwors` on the `Siswa` table. All the data in the column will be lost.
  - Added the required column `password` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "passwors",
ADD COLUMN     "password" VARCHAR(255) NOT NULL;
