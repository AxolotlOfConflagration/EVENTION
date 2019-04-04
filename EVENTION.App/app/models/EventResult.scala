package models

import models.database.{Business, Category, Event}
import models.database.{Category, Event}

case class EventResult
(
  event: Event,
  businessUser: Business,
  categories: Seq[Category]
)
