/*
  Warnings:

  - You are about to drop the column `userName` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
