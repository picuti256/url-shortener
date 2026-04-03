-- AlterTable
ALTER TABLE "Url" ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("shortUrl");

-- DropIndex
DROP INDEX "Url_shortUrl_key";
