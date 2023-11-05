/*
  Warnings:

  - You are about to drop the column `menuId` on the `MenuOption` table. All the data in the column will be lost.
  - Added the required column `optionId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuOption" DROP CONSTRAINT "MenuOption_menuId_fkey";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "optionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MenuOption" DROP COLUMN "menuId";

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "MenuOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
