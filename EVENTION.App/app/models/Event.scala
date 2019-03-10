package models

import org.joda.time.DateTime
import play.api.libs.json._
import play.api.libs.json.JodaWrites._
import play.api.libs.json.JodaReads._

case class Event
(
  id: Long = 0,
  name: String,
  shortDescription: String,
  longDescription: String,
  creationDate: DateTime = DateTime.now(),
  eventStart: DateTime,
  eventEnd: DateTime,
  ownerId: Long,
  geoJson: String,
  address: String,
  imageSource: String
)

object Event{
  implicit val eventFormat: OFormat[Event] = Json.format[Event]
}