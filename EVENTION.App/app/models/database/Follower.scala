package models.database

import org.joda.time.DateTime

case class Follower
(
  userId: Option[Long],
  followingId: Long,
  timestamp: DateTime
)
