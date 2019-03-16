package controllers

import javax.inject._
import models.dbTypes.{BusinessUser, Event}
import play.api.libs.json.JodaReads._
import play.api.libs.json.JodaWrites._
import play.api.libs.json._
import play.api.mvc._
import repositories.EventRepository
import utils.JsonUtils._

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class EventController @Inject()(repo: EventRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def create() = Action(parse.json).async {implicit request =>
    val event = (request.body \ "event").get.as[Event]
    val categories = (request.body \ "categories").toOption.map(json => json.as[Seq[Long]]).getOrElse(Nil)

    repo.insert(event, categories).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def all() = Action.async { implicit request =>
    repo.all().map(events => Ok(Json.toJson(events)))
  }

//  def get(id: Long) = Action.async { implicit request =>
//    repo.get(id).map{
//      case Some(business) => Ok(Json.toJson(business))
//      case _ => NotFound
//    }
//  }
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
//  def delete(id: Long) = Action.async { implicit request =>
//    repo.delete(id).map(_ => Ok)
//  }
}
