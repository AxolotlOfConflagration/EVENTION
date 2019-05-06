package models

import models.database.{Business, BusinessUser, Category, Event}
import play.api.libs.json.{Json, OFormat}

case class EventResult
(
  event: Event,
  businessUser: BusinessUser,
  business: Business,
  categories: Seq[Category]
){
  def reduce(other: EventResult): EventResult ={
    val cats = categories ++ other.categories
    copy(categories = cats)
  }
}

object EventResult{
  def reduce(e1: EventResult, e2: EventResult): EventResult ={
    val cats = e1.categories ++ e2.categories
    e1.copy(categories = cats)
  }

  implicit val eventResultFormat: OFormat[EventResult] = Json.format[EventResult]
}
