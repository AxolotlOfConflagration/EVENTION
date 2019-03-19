# --- !Ups

create table "businesses" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"name" VARCHAR NOT NULL UNIQUE);
create table "businessUsers" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"name" VARCHAR NOT NULL,"businessId" BIGINT NOT NULL);
create table "categories" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"category" VARCHAR NOT NULL UNIQUE);
create table "events" ("id" BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,"name" VARCHAR NOT NULL,"shortDescription" VARCHAR,"longDescription" VARCHAR,"creationDate" TIMESTAMP NOT NULL,"eventStart" TIMESTAMP NOT NULL,"eventEnd" TIMESTAMP NOT NULL,"ownerId" BIGINT,"geoJson" VARCHAR,"address" VARCHAR,"imageSource" VARCHAR,"city" VARCHAR);
create table "eventCategories" ("eventId" BIGINT NOT NULL,"catId" BIGINT NOT NULL);
create unique index "index" on "eventCategories" ("eventId","catId");
alter table "businessUsers" add constraint "fk_business" foreign key("businessId") references "businesses"("id") on update NO ACTION on delete NO ACTION;
alter table "events" add constraint "fk_owner" foreign key("ownerId") references "businessUsers"("id") on update NO ACTION on delete NO ACTION;
alter table "eventCategories" add constraint "fk_category" foreign key("catId") references "categories"("id") on update NO ACTION on delete NO ACTION;
alter table "eventCategories" add constraint "fk_event" foreign key("eventId") references "events"("id") on update NO ACTION on delete NO ACTION;

insert into "businesses"("id", "name") VALUES ( 1, 'Evention' );

insert into "categories"("category") VALUES ('Sport'),('Kultura'),('Koncert'),('Targi');

      

# --- !Downs

alter table "eventCategories" drop constraint "fk_category";
alter table "eventCategories" drop constraint "fk_event";
alter table "events" drop constraint "fk_owner";
alter table "businessUsers" drop constraint "fk_business";
drop table "eventCategories";
drop table "events";
drop table "categories";
drop table "businessUsers";
drop table "businesses";
