alter table "public"."user" alter column "id" set default nextval('user_id_seq'::regclass);
