/*
  Warnings:

  - You are about to drop the `ActionTitle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nameEn` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameTh` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueEn` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueTh` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActionTitle" DROP CONSTRAINT "ActionTitle_actionId_fkey";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "nameEn" VARCHAR NOT NULL,
ADD COLUMN     "nameTh" VARCHAR NOT NULL,
ADD COLUMN     "valueEn" VARCHAR NOT NULL,
ADD COLUMN     "valueTh" VARCHAR NOT NULL;

-- DropTable
DROP TABLE "ActionTitle";
