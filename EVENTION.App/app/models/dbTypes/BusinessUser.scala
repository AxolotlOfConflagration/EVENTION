package models.dbTypes

import play.api.libs.json.{Json, OFormat}

case class BusinessUser
(
  id: Long = 0,
  businessId: Long,
)

object BusinessUser{
  implicit val businessUserFormat: OFormat[BusinessUser] = Json.format[BusinessUser]
}
