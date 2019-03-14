package models.dbTypes

import play.api.libs.json.{Json, OFormat}

case class Business
(
  id: Option[Long] = None,
  name: String
)

object Business {
  implicit val businessUserFormat: OFormat[Business] = Json.format[Business]
}
