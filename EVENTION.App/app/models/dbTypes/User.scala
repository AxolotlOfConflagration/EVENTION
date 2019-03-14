package models.dbTypes

import play.api.libs.json.Json

case class User
(
  id: Long = 0,
  firstName: String,
  lastName: String,
  nick: Option[String],
  externalId: Option[String]
)

object User{
  implicit val userFormat = Json.format[User]
}