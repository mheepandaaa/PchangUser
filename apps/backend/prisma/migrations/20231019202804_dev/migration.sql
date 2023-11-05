/*
  Warnings:

  - Added the required column `actionId` to the `MenuOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActionTemplate" DROP CONSTRAINT "ActionTemplate_optionId_fkey";

-- AlterTable
ALTER TABLE "MenuOption" ADD COLUMN     "actionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuOption" ADD CONSTRAINT "MenuOption_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "ActionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
