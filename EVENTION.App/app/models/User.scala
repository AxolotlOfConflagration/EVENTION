package models

case class User
(
  id: Long = 0,
  firstName: String,
  lastName: String,
  nick: Option[String],
  externalId: Option[String]
)
