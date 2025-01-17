/*
  Warnings:

  - The `timeStamsp` column on the `Upload` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "timeStamsp",
ADD COLUMN     "timeStamsp" TIMESTAMP(3);
