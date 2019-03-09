package controllers

import javax.inject._
import models.Event
import play.api.libs.json._
import play.api.mvc._
import repositories.EventRepository

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
class EventController @Inject()(repo: EventRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  /**
    * Create an Action to render an HTML page.
    *
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */

  def index(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    repo.get().map { event =>
      Ok(Json.toJson(event))
    }
  }

  def createEvent(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val event = request.body.asJson.get.as[Event]
    repo.insert(event).map(res => Ok)
  }
}

