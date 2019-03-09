package models

import org.joda.time.DateTime
import play.api.libs.json._

case class Event
(
  id: Long = 0,
  name: String
)

object Event{
  implicit val eventFormat: OFormat[Event] = Json.format[Event]
}