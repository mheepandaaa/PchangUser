/*
  Warnings:

  - You are about to drop the column `templateId` on the `Action` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_templateId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "templateId";

-- CreateTable
CREATE TABLE "_ActionToActionTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToActionTemplate_AB_unique" ON "_ActionToActionTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToActionTemplate_B_index" ON "_ActionToActionTemplate"("B");

-- AddForeignKey
ALTER TABLE "_ActionToActionTemplate" ADD CONSTRAINT "_ActionToActionTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToActionTemplate" ADD CONSTRAINT "_ActionToActionTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "ActionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
