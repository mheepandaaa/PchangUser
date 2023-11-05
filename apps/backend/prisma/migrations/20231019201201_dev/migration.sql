-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "price" SMALLINT NOT NULL,
    "image" VARCHAR[],

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuTitle" (
    "menuId" TEXT NOT NULL,
    "th" VARCHAR NOT NULL,
    "en" VARCHAR NOT NULL,

    CONSTRAINT "MenuTitle_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "MenuOption" (
    "id" TEXT NOT NULL,
    "menuId" VARCHAR NOT NULL,
    "required" INTEGER NOT NULL,

    CONSTRAINT "MenuOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuOptionTitle" (
    "menuOptionId" TEXT NOT NULL,
    "th" VARCHAR NOT NULL,
    "en" VARCHAR NOT NULL,

    CONSTRAINT "MenuOptionTitle_pkey" PRIMARY KEY ("menuOptionId")
);

-- CreateTable
CREATE TABLE "ActionTemplate" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "actionIds" TEXT[],

    CONSTRAINT "ActionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "templateId" VARCHAR NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionTitle" (
    "actionId" TEXT NOT NULL,
    "th" VARCHAR NOT NULL,
    "en" VARCHAR NOT NULL,

    CONSTRAINT "ActionTitle_pkey" PRIMARY KEY ("actionId")
);

-- AddForeignKey
ALTER TABLE "MenuTitle" ADD CONSTRAINT "MenuTitle_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuOption" ADD CONSTRAINT "MenuOption_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuOptionTitle" ADD CONSTRAINT "MenuOptionTitle_menuOptionId_fkey" FOREIGN KEY ("menuOptionId") REFERENCES "MenuOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionTemplate" ADD CONSTRAINT "ActionTemplate_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "MenuOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ActionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionTitle" ADD CONSTRAINT "ActionTitle_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
