package models

import play.api.libs.json.{Json, OFormat}

case class BusinessUser
(
  id: Long = 0,
  firstName: String,
  lastName: String,
  business: String
)

object BusinessUser
{
  implicit val businessUserFormat: OFormat[BusinessUser] = Json.format[BusinessUser]
}
