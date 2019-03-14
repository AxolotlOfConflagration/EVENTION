package controllers

import javax.inject._
import models.dbTypes.Event
import play.api.libs.json._
import play.api.mvc._
import repositories.BaseRepository

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class EventController @Inject()(repo: BaseRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

//  def index() = Action.async { implicit request =>
//    repo.all().map { event =>
//      Ok(Json.toJson(event))
//    }
//  }
//
//  def createEvent() = Action.async { implicit request =>
//    val event = request.body.asJson.all.as[Event]
//    repo.insert(event).map(res => Ok)
//  }
//
//  def swagger() = Action{
//    Redirect("/docs/swagger-ui/index.html?url=/assets/swagger.json")
//  }
//
  def getSql() = Action { implicit request =>
    Ok(repo.sql())
  }
//
//  def intEndpoint(int: String) = Action { implicit request =>
//    Ok((int.toInt + 1).toString)
//  }
}
