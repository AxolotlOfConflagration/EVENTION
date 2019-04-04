package models.database

import play.api.libs.json.{Json, OFormat}

case class User
(
  id: Option[Long],
  firstName: String,
  lastName: String,
  nick: Option[String],
  externalId: Option[String]
)

object User{
  implicit val userFormat: OFormat[User] = Json.format[User]
}