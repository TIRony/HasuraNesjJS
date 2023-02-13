CREATE TABLE "public"."user" ("id" serial NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "userName" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
