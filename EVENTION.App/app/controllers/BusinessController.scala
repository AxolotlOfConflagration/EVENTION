package controllers

import javax.inject.Inject
import models.database.Business
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repositories.BusinessRepository

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}
import utils.JsonUtils._

class BusinessController @Inject()
(
  repo: BusinessRepository,
  cc: ControllerComponents
)(implicit ec: ExecutionContext) extends AbstractController(cc){

  def create(): Action[Business] = Action(parse.json[Business]).async { implicit request =>
    val business = request.body
    repo.insert(business).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def all(): Action[AnyContent] = Action.async { implicit request =>
    repo.all().map(businesses => Ok(Json.toJson(businesses)))
  }

  def get(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.get(id).map{
      case Some(business) => Ok(Json.toJson(business))
      case _ => NotFound
    }
  }

  def update: Action[Business] = Action(parse.json[Business]).async { implicit request =>
    repo.update(request.body).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.delete(id).map(_ => Ok)
  }
}
