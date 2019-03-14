package models.dbTypes

import play.api.libs.json.{Json, OFormat}

case class Category
(
  id: Long,
  category: String
)

object Category{
  implicit val categoryFormat: OFormat[Category] = Json.format[Category]
}
