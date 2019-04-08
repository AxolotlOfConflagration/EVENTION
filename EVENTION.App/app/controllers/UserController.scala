package controllers

import javax.inject.Inject
import models.database.{Recommendation, User}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repositories.UserRepository
import utils.JsonUtils._

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class UserController @Inject()
(repo: UserRepository, cc: ControllerComponents)
(implicit ec: ExecutionContext) extends AbstractController(cc) {
  def create(): Action[User] = Action(parse.json[User]).async { implicit request =>
    val user = request.body
    repo.insert(user).map {
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def all(): Action[AnyContent] = Action.async { implicit request =>
    repo.all().map(businesses => Ok(Json.toJson(businesses)))
  }

  def get(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.get(id).map {
      case Some(business) => Ok(Json.toJson(business))
      case _ => NotFound
    }
  }

  def update: Action[User] = Action(parse.json[User]).async { implicit request =>
    repo.update(request.body).map {
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.delete(id).map(_ => Ok)
  }

  def singUpForEvent(userId: Long, eventId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.singUpForEvent(userId, eventId).map(_ => Ok)
  }

  def leaveEvent(userId: Long, eventId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.leaveEvent(userId, eventId).map(_ => Ok)
  }

  def activeEvents(userId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.activeEvents(userId).map(events => Ok(Json.toJson(events)))
  }

  def allEvents(userId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.allEvents(userId).map(events => Ok(Json.toJson(events)))
  }

  def pastEvents(userId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.pastEvents(userId).map(events => Ok(Json.toJson(events)))
  }

  def upsertRecommendation(userId: Long): Action[Seq[Long]] = Action(parse.json[Seq[Long]]).async { implicit request =>
    val rec = Recommendation.fromJson(userId, request.body)

    repo.upsert(rec).map(_ => Ok)
  }

  def recommendation(userId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.recommendation(userId).map { value => Ok(Json.toJson(value))
    }
  }
}
