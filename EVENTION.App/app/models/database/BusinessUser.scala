package models.database

import play.api.libs.json.{Json, OFormat}

case class BusinessUser
(
  id: Option[Long],
  name: String,
  businessId: Long,
)

object BusinessUser{
  implicit val businessUserFormat: OFormat[BusinessUser] = Json.format[BusinessUser]
}
