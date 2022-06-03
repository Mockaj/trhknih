-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "numberOfPages" INTEGER NOT NULL,
    "publishedDate" TEXT NOT NULL,
    "notes" TEXT,
    "photo" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAuthor" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "BookAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "bookCondition" TEXT NOT NULL,
    "photo" TEXT,
    "sellerId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "sellerId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OfferToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookAuthor_bookId_authorId_key" ON "BookAuthor"("bookId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_offerId_customerId_key" ON "Order"("offerId", "customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_offerId_key" ON "Order"("offerId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_sellerId_reviewerId_key" ON "Review"("sellerId", "reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "_OfferToTag_AB_unique" ON "_OfferToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_OfferToTag_B_index" ON "_OfferToTag"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor" ADD CONSTRAINT "BookAuthor_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor" ADD CONSTRAINT "BookAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToTag" ADD CONSTRAINT "_OfferToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToTag" ADD CONSTRAINT "_OfferToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
