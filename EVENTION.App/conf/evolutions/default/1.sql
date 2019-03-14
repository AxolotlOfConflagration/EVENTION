-- noinspection SqlNoDataSourceInspectionForFile

# --- !Ups

create table "businesses" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"name" VARCHAR NOT NULL UNIQUE);
create table "businessUsers" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"businessId" BIGINT NOT NULL);
alter table "businessUsers" add constraint "fk_business" foreign key("businessId") references "businesses"("id") on update NO ACTION on delete NO ACTION;
create table "events" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"name" VARCHAR NOT NULL,"shortDescription" VARCHAR NOT NULL,"longDescription" VARCHAR NOT NULL,"creationDate" TIMESTAMP NOT NULL,"eventStart" TIMESTAMP NOT NULL,"eventEnd" TIMESTAMP NOT NULL,"ownerId" BIGINT NOT NULL,"geoJson" VARCHAR NOT NULL,"address" VARCHAR NOT NULL,"imageSource" VARCHAR NOT NULL);
alter table "events" add constraint "fk_owner" foreign key("ownerId") references "businessUsers"("id") on update NO ACTION on delete NO ACTION;

insert into "businesses"("id", "name") VALUES ( 1, 'Evention' )

-- # --- !Downs
-- DROP TABLE "events";