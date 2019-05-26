package controllers

import javax.inject.Inject
import models.database.{Recommendation, User}
import org.pac4j.core.profile.CommonProfile
import org.pac4j.oauth.profile.google2.Google2Profile
import org.pac4j.play.scala.{Security, SecurityComponents}
import org.pac4j.play.store.PlaySessionStore
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent}
import repositories.{EventRepository, RecommendationRepository, UserRepository}

import concurrent.Await
import scala.concurrent.ExecutionContext
import scala.concurrent.duration.Duration
import scala.util.Random

class AuthController @Inject()
(
  repo: UserRepository,
  recommendationRepo: RecommendationRepository,
  eventRepo: EventRepository,
  override val controllerComponents: SecurityComponents
)(implicit ec: ExecutionContext) extends Security[CommonProfile] {

  def loginWithGoogle: Action[AnyContent] = Secure("Google2Client") { implicit request =>
    val profile = request.profiles.head
    val fullname = profile.getDisplayName.split("//s+")

    val user = User(
      id = None,
      firstName = if (fullname.length > 1) fullname(0) else "",
      lastName = if (fullname.length > 2) fullname(1) else "",
      nick = Some(profile.getDisplayName),
      externalId = Some(profile.getEmail)
    )

    val userId = repo.registerOrLogin(user)
    val ids = Await.result[Seq[Long]](eventRepo.all().map(_.map(_.id.getOrElse(-1L))), Duration.Inf)
    val randoms = Random.shuffle(ids.filterNot(_ == -1L)).take(5).mkString("[", ",", "]")

    recommendationRepo.addOrReplaceRecommendation(Recommendation(userId, randoms))

    Redirect(s"http://localhost:3000/login?userid=$userId")
  }

  def loginBasic: Action[AnyContent] = Secure("DirectBasicAuthClient ") { implicit request =>
    val userId = 1
    Ok("""{"userId": 1, "type": "business"}""")
  }

  def callback: Action[AnyContent] = Action { implicit request =>
    request.cookies.get("PLAY_SESSION").map { x =>
      Ok("You are logged in ;)")
    }.getOrElse(
      Unauthorized("You aren't logged in :c")
    )
  }
}