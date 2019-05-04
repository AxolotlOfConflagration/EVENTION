package controllers

import javax.inject.Inject
import models.database.Feed._
import models.database.Follower
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repositories.FollowersRepository

import scala.concurrent.ExecutionContext

class FollowerController @Inject()
(repo: FollowersRepository, cc: ControllerComponents)
(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def follow(userId: Long, whoId: Long): Action[AnyContent] = Action.async {
    repo.follow(Follower(Some(userId), whoId)).map(_ => Ok)
  }

  def unfollow(userId: Long, whoId: Long): Action[AnyContent] = Action.async {
    repo.unfollow(userId, whoId).map(_ => Ok)
  }

  def following(userId: Long): Action[AnyContent] = Action.async {
    repo.following(userId).map(result => Ok(Json.toJson(result)))
  }

  def feed(userId: Long): Action[AnyContent] = Action.async {
    repo.feed(userId).map(result => Ok(Json.toJson(result)))
  }
}
