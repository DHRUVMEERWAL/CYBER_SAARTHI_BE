-- CreateTable
CREATE TABLE "Questionnaire" (
    "id_question" SERIAL NOT NULL,
    "questionText" TEXT NOT NULL,
    "options" TEXT,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id_question")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id_Blogs" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id_Blogs")
);

-- CreateTable
CREATE TABLE "contact_us" (
    "id_contact_us" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "contact_us_pkey" PRIMARY KEY ("id_contact_us")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id_reviews" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id_reviews")
);

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_questionText_key" ON "Questionnaire"("questionText");
