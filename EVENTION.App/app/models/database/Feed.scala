package models.database

import org.joda.time.DateTime
import play.api.libs.json.{Json, OFormat}
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._

case class Feed
(
  user: User,
  event: Event,
  date: DateTime
)

object Feed{
  implicit val feedFormat: OFormat[Feed] = Json.format[Feed]
}
