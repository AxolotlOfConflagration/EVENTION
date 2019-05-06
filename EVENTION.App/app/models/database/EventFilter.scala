package models.database

import play.api.libs.json.{Json, OFormat}

case class EventFilter
(
  beginning: Int = 0,
  count: Int = 4,
  city: Option[String] = None,
  categories: List[Long] = Nil,
  ordering: String = "creationDate", // eventStart, eventEnd
  ascending: Boolean = false
)

object EventFilter {
  implicit val eventFilterFormat: OFormat[EventFilter] = Json
    .using[Json.WithDefaultValues].format[EventFilter]
}