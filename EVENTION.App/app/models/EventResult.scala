package models

import models.dbTypes.{Business, Category, Event}

case class EventResult
(
  event: Event,
  businessUser: Business,
  categories: Seq[Category]
)
