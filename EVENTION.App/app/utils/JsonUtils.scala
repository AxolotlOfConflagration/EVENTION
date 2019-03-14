package utils

import play.api.libs.json.JodaWrites._
import play.api.libs.json.JodaReads._
import play.api.libs.json.{JsPath, JsValue, Json, Writes}

object JsonUtils {
  implicit val throwableWrites = new Writes[Throwable] {
    override def writes(o: Throwable): JsValue = {
      Json.obj(
        "message" -> o.getMessage,
        "details" -> o.toString
      )
    }
  }
}