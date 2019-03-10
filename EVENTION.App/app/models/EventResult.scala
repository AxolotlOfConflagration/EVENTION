package models

case class EventResult
(
  event: Event,
  businessUser: BusinessUser,
  categories: Seq[Category]
)
