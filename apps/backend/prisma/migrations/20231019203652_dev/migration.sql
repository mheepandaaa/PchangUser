/*
  Warnings:

  - You are about to drop the `_ActionToActionTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `templateId` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ActionToActionTemplate" DROP CONSTRAINT "_ActionToActionTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToActionTemplate" DROP CONSTRAINT "_ActionToActionTemplate_B_fkey";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "templateId" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "ActionTemplate" ADD COLUMN     "actionIds" TEXT[];

-- DropTable
DROP TABLE "_ActionToActionTemplate";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ActionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
