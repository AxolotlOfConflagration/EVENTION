package models.database

import org.joda.time.DateTime
import play.api.libs.json.{Json, OFormat}
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._

case class EventParticipant
(
  eventId: Long,
  userId: Long,
  singUpDate: DateTime = DateTime.now
)

object EventParticipant{
  implicit val eventParticipantFormat: OFormat[EventParticipant] =
    Json.using[Json.WithDefaultValues].format[EventParticipant]
}