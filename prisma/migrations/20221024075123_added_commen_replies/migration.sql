/*
  Warnings:

  - Added the required column `reply` to the `comment_replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment_replies" ADD COLUMN     "reply" TEXT NOT NULL;
