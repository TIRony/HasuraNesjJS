CREATE TABLE "public"."user" ("id" serial NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
