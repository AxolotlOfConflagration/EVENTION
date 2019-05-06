package models.database

import play.api.libs.json.{Json, OFormat}

case class Category
(
  id: Option[Long],
  category: String
)

object Category{
  implicit val categoryFormat: OFormat[Category] = Json.format[Category]
}
