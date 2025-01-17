/*
  Warnings:

  - You are about to drop the column `timeStamsp` on the `Upload` table. All the data in the column will be lost.
  - Added the required column `uploadDisplayImage` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "timeStamsp",
ADD COLUMN     "uploadDescription" TEXT,
ADD COLUMN     "uploadDisplayImage" TEXT NOT NULL,
ADD COLUMN     "uploadTimeStamp" TIMESTAMP(3);
