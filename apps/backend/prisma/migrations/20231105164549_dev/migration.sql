-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "menuIds" TEXT[],

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
