package controllers

import javax.inject.Inject
import models.database.BusinessUser
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import repositories.BusinessUserRepository

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}
import utils.JsonUtils._

class BusinessUserController @Inject()
(
  repo: BusinessUserRepository,
  cc: ControllerComponents
)(implicit ec: ExecutionContext) extends AbstractController(cc){

  def create() = Action(parse.json[BusinessUser]).async {implicit request =>
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
    repo.get(id).map{
      case Some(business) => Ok(Json.toJson(business))
      case _ => NotFound
    }
  }

  def getByBusinness(id: Long) = Action.async { implicit request =>
    repo.getByBusiness(id).map{users => Ok(Json.toJson(users))}
  }

  def update = Action(parse.json[BusinessUser]).async { implicit request =>
    repo.update(request.body).map{
      case Success(value) => Ok(Json.toJson(value))
      case Failure(exception) => BadRequest(Json.toJson(exception))
    }
  }

  def delete(id: Long) = Action.async { implicit request =>
    repo.delete(id).map(_ => Ok)
  }

}
