package models.database

import org.joda.time.DateTime
import play.api.libs.json.{Json, OFormat}
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._

case class Follower
(
  userId: Option[Long],
  followingId: Long,
  timestamp: DateTime = DateTime.now
)

object Follower{
  implicit val followerFormat: OFormat[Follower] = Json
    .using[Json.WithDefaultValues].format[Follower]
}