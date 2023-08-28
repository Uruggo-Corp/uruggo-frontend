-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('RENTED', 'AVAILABLE', 'PENDING');

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
    "street_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT,
    "country" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "agent_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "image_listingId_idx" ON "image"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "listing_slug_key" ON "listing"("slug");

-- CreateIndex
CREATE INDEX "listing_agent_id_idx" ON "listing"("agent_id");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
