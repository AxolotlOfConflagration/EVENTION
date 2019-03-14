package models.dbTypes

import org.joda.time.DateTime
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._
import play.api.libs.json._

import scala.util.Try

case class Event
(
  id: Long = 0,
  name: String,
  shortDescription: Option[String],
  longDescription: Option[String],
  creationDate: DateTime = DateTime.now(),
  eventStart: DateTime,
  eventEnd: DateTime,
  ownerId: Option[Long],
  geoJson: Option[String] = None,
  address: Option[String] = None,
  imageSource: Option[String] = None
){
  def city: Option[String] = Try{ (Json.parse(address.get) \ "City").get.as[String]}.toOption
}

object Event {
  implicit val eventFormat: OFormat[Event] = Json.format[Event]
}