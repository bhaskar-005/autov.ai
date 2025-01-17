/*
  Warnings:

  - You are about to drop the column `channelId` on the `YoutubeCredential` table. All the data in the column will be lost.
  - Added the required column `accessTokenExpiry` to the `YoutubeCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelCustomUrl` to the `YoutubeCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelLogo` to the `YoutubeCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeCredential" DROP COLUMN "channelId",
ADD COLUMN     "accessTokenExpiry" TEXT NOT NULL,
ADD COLUMN     "channelCustomUrl" TEXT NOT NULL,
ADD COLUMN     "channelLogo" TEXT NOT NULL;
