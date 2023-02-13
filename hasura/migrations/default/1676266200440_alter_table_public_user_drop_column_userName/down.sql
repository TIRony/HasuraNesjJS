alter table "public"."user" alter column "userName" drop not null;
alter table "public"."user" add column "userName" text;
