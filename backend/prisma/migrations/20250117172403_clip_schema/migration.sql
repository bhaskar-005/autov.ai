/*
  Warnings:

  - A unique constraint covering the columns `[UploadName]` on the table `Upload` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autoUpload` to the `Upload` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `uploadTime` on the `Upload` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accessTokenExpiry` on the `YoutubeCredential` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "autoUpload" BOOLEAN NOT NULL,
ADD COLUMN     "speechLanguage" TEXT NOT NULL DEFAULT 'Hindi',
DROP COLUMN "uploadTime",
ADD COLUMN     "uploadTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "YoutubeCredential" DROP COLUMN "accessTokenExpiry",
ADD COLUMN     "accessTokenExpiry" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "ClipInfo" (
    "id" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "clipUrl" TEXT NOT NULL,
    "clipName" TEXT NOT NULL,
    "clipDescription" TEXT NOT NULL,
    "clipTags" TEXT[],
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "processingStartedAt" TIMESTAMP(3),
    "processingCompletedAt" TIMESTAMP(3),

    CONSTRAINT "ClipInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upload_UploadName_key" ON "Upload"("UploadName");

-- AddForeignKey
ALTER TABLE "ClipInfo" ADD CONSTRAINT "ClipInfo_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "Upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
