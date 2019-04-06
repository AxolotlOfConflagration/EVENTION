package models.database

import play.api.libs.json.Json

case class Recommendation
(
  userId: Long,
  recommendation: String
){
  def asJson = {
    Json.obj(
      "userId" -> userId,
      "recommendation" -> Json.parse(recommendation).as[Seq[Long]]
    )
  }
}

object Recommendation{
  def fromJson(userId: Long, events: Seq[Long]) = {
    new Recommendation(userId, Json.toJson(events).toString)
  }
}