package utils

import play.api.libs.json.JodaWrites._
import play.api.libs.json.JodaReads._
import play.api.libs.json.{JsPath, Json, Writes}

object JsonUtils {
  implicit val throwableFormat = Json.format[Throwable]
}