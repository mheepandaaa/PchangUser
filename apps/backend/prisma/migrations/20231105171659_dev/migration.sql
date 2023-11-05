-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('review', 'approved', 'wait_for_payment', 'preparing', 'served');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'review',
ALTER COLUMN "slip" DROP NOT NULL;
