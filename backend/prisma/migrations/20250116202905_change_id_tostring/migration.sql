/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FacebookCredential" DROP CONSTRAINT "FacebookCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "InstagramCredential" DROP CONSTRAINT "InstagramCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoginActivity" DROP CONSTRAINT "LoginActivity_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialAccountGroup" DROP CONSTRAINT "SocialAccountGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "TikTokCredential" DROP CONSTRAINT "TikTokCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_uploaderId_fkey";

-- DropForeignKey
ALTER TABLE "XCredential" DROP CONSTRAINT "XCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeCredential" DROP CONSTRAINT "YoutubeCredential_userId_fkey";

-- AlterTable
ALTER TABLE "FacebookCredential" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "InstagramCredential" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LoginActivity" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SocialAccountGroup" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TikTokCredential" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Upload" ALTER COLUMN "uploaderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "XCredential" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "YoutubeCredential" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "LoginActivity" ADD CONSTRAINT "LoginActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialAccountGroup" ADD CONSTRAINT "SocialAccountGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookCredential" ADD CONSTRAINT "FacebookCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramCredential" ADD CONSTRAINT "InstagramCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeCredential" ADD CONSTRAINT "YoutubeCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XCredential" ADD CONSTRAINT "XCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TikTokCredential" ADD CONSTRAINT "TikTokCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
