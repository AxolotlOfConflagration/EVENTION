package controllers

import javax.inject.Inject
import models.dbTypes.Business
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import repositories.BusinessRepository

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}
import utils.JsonUtils._

class BusinessController @Inject()
(
  repo: BusinessRepository,
  cc: ControllerComponents
)(implicit ec: ExecutionContext) extends AbstractController(cc){

  def create() = Action(parse.json[Business]).async {implicit request =>
    val business = request.body
    repo.insert(business).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def all() = Action.async { implicit request =>
    repo.all().map(businesses => Ok(Json.toJson(businesses)))
  }

  def get(id: Long) = Action.async { implicit request =>
    repo.get(id).map(business => Ok(Json.toJson(business)))
  }

  def update = Action(parse.json[Business]).async { implicit request =>
    repo.update(request.body).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def delete(id: Long) = Action.async { implicit request =>
    repo.delete(id).map(_ => Ok)
  }
}
