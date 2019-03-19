package controllers

import javax.inject.Inject
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import repositories.CategoryRepository

import scala.concurrent.ExecutionContext

class CategoryController @Inject()
(
  repo: CategoryRepository,
  cc: ControllerComponents
)(implicit ec: ExecutionContext) extends AbstractController(cc){
  def all() = Action.async { implicit request =>
    repo.all().map(cats => Ok(Json.toJson(cats)))
  }

  def get(id: Long) = Action.async { implicit request =>
    repo.get(id).map{
      case Some(cat) => Ok(Json.toJson(cat))
      case _ => NotFound
    }
  }

  def getMany() = Action(parse.json).async { implicit request =>
    val ids = request.body.as[Seq[Long]]

    repo.get(ids).map(cats => Ok(Json.toJson(cats)))
  }
}
