package models.dbTypes

import org.joda.time.DateTime
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._
import play.api.libs.json._

import scala.util.Try

case class Event
(
  id: Option[Long],
  name: String,
  shortDescription: Option[String],
  longDescription: Option[String],
  creationDate: DateTime = DateTime.now(),
  eventStart: DateTime = DateTime.now(),
  eventEnd: DateTime = DateTime.now().plusDays(1),
  ownerId: Option[Long],
  geoJson: Option[String],
  address: Option[String],
  imageSource: Option[String],
  city: Option[String]
)

object Event {
  implicit val eventFormat: OFormat[Event] = Json.format[Event]
}