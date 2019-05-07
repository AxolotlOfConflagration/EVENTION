package controllers

import com.byteowls.jopencage.JOpenCageGeocoder
import com.byteowls.jopencage.model.JOpenCageForwardRequest
import javax.inject._
import models.database.{Event, EventFilter}
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._
import play.api.libs.json._
import play.api.mvc._
import repositories.EventRepository
import utils.JsonUtils._
import models.database.EventFilter._

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}
import collection.JavaConverters._

class EventController @Inject()(repo: EventRepository,
                                geoClient: JOpenCageGeocoder,
                                cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  private def enrichEvent(old: Event): Event = {
    if(old.geoJson.isEmpty && old.address.isDefined) {
      val request = new JOpenCageForwardRequest(old.address.get)
      request.setRestrictToCountryCode("pl")

      val geoJson = geoClient
        .forward(request)
        .getResults
        .asScala
        .headOption
        .map(_.getGeometry)
        .map(point => s"""{"type": "Point", "coordinates": [${point.getLng}, ${point.getLat}]}""")

      old.copy(geoJson = geoJson)
    } else old
  }

  def create(): Action[JsValue] = Action(parse.json).async { implicit request =>
    val event = (request.body \ "event").get.as[Event]
    val categories = (request.body \ "categories").toOption.map(json => json.as[Seq[Long]]).getOrElse(Nil)

    repo.insert(enrichEvent(event), categories).map {
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def all(): Action[AnyContent] = Action.async { implicit request =>
    repo.all().map(events => Ok(Json.toJson(events)))
  }

  def get(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.get(id).map {
      case Some(event) => Ok(Json.obj("event" -> Json.toJson(event._1), "categories" -> Json.toJson(event._2)))
      case _ => NotFound
    }
  }

  def filtered(): Action[JsValue] = Action(parse.json).async { implicit request =>
    val filter = request.body.as[EventFilter]

    repo.all(filter).map {events => Ok(Json.toJson(events))}
  }

  //
  //  def getByBusinness(id: Long) = Action.async { implicit request =>
  //    repo.getByBusiness(id).map{users => Ok(Json.toJson(users))}
  //  }
  //
  //  def update = Action(parse.json[BusinessUser]).async { implicit request =>
  //    repo.update(request.body).map{
  //      case Success(value) => Ok(Json.toJson(value))
  //      case Failure(exception) => BadRequest(Json.toJson(exception))
  //    }
  //  }
  //
  def delete(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.delete(id).map(_ => Ok)
  }

  def participants(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.participants(id).map(users => Ok(Json.toJson(users)))
  }
}
