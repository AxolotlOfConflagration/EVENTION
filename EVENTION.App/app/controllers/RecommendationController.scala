package controllers

import javax.inject.Inject
import models.database.Recommendation
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repositories.{RecommendationRepository, UserRepository}

import scala.concurrent.ExecutionContext

class RecommendationController @Inject()
(repo: RecommendationRepository, cc: ControllerComponents)
(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def addOrRemoveRecommendation(userId: Long): Action[Seq[Long]] = Action(parse.json[Seq[Long]]).async { implicit request =>
    val rec = Recommendation.fromJson(userId, request.body)

    repo.addOrReplaceRecommendation(rec).map(_ => Ok)
  }

  def getRecommendation(userId: Long): Action[AnyContent] = Action.async { implicit request =>
    repo.getRecommendation(userId).map { value => Ok(Json.toJson(value))
    }
  }
}
