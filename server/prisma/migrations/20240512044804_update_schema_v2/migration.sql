-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Draft', 'Archived');
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(20) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roles" "Role" [] DEFAULT ARRAY ['User']::"Role" [],
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "parentCategoryId" INTEGER,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Image" (
    "fileId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Image_pkey" PRIMARY KEY ("fileId")
);
-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "inStock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Active',
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "line1" TEXT,
    "line2" TEXT,
    "state" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "total" INTEGER NOT NULL,
    "shippingCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "OrdersOnProducts" (
    "productId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    CONSTRAINT "OrdersOnProducts_pkey" PRIMARY KEY ("productId", "orderId")
);
-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");
-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
-- AddForeignKey
ALTER TABLE "Category"
ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Image"
ADD CONSTRAINT "Image_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Image"
ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "OrdersOnProducts"
ADD CONSTRAINT "OrdersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "OrdersOnProducts"
ADD CONSTRAINT "OrdersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_CategoryToProduct"
ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_CategoryToProduct"
ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (102, 'plants', 'Plants', NULL);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (103, 'care', 'Care', NULL);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (104, 'indoor', 'Indoor', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (105, 'outdoor', 'Outdoor', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (106, 'succulents', 'Succulents', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (107, 'foliage', 'Foliage', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (108, 'flowering', 'Flowering', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (109, 'air-purifying', 'Air-purifying', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (110, 'trees-shrubs', 'Trees and Shrubs', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (111, 'perennials', 'Perennials', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (112, 'annuals', 'Annuals', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (113, 'vines-climbers', 'Vines and Climbers', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (114, 'edible', 'Edible', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (115, 'herbs', 'Herbs', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (116, 'vegetables', 'Vegetables', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (117, 'fruits', 'Fruits', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (118, 'microgreens', 'Microgreens', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
        119,
        'soil-fertilizers',
        'Soil and Fertilizers',
        103
    );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (120, 'potting-soil', 'Potting Soil', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (121, 'fertilizers', 'Fertilizers', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (122, 'compost-mulch', 'Compost and Mulch', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (123, 'pots-planters', 'Pots and Planters', 103);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (124, 'indoor-pots', 'Indoor Pots', 123);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (125, 'outdoor-planters', 'Outdoor Planters', 123);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
        126,
        'decorative-planters',
        'Decorative Planters',
        123
    );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
        127,
        'tools-accessories',
        'Tools and Accessories',
        103
    );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (128, 'gardening-tools', 'Gardening Tools', 127);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (129, 'plant-supports', 'Plant Supports', 127);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
        130,
        'plant-care-accessories',
        'Plant Care Accessories',
        127
    );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (131, 'holiday', 'Holiday', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (132, 'decorative', 'Decorative', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (133, 'low-light', 'Low-light', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (134, 'christmas', 'Christmas', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (135, 'halloween', 'Halloween', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (136, 'valentine', 'Valentine', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (137, 'lunar-new-year', 'Lunar New Year', 131);