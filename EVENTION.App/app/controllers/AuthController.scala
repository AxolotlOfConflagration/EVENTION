package controllers

import javax.inject.Inject
import org.pac4j.core.profile.CommonProfile
import org.pac4j.play.scala.{Security, SecurityComponents}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repositories.BusinessRepository

import scala.concurrent.ExecutionContext

class AuthController @Inject()
(
  repo: BusinessRepository,
  override val controllerComponents: SecurityComponents
)(implicit ec: ExecutionContext) extends Security[CommonProfile] {

  def loginWithGoogle: Action[AnyContent] = Secure("Google2Client") { implicit request =>
    Ok(Json.toJson(request.profiles.map(usr => s"${usr.getEmail} ${usr.getUsername} ${usr.getDisplayName}")))
  }

  def callback: Action[AnyContent] = Action { implicit request =>
    request.cookies.get("PLAY_SESSION").map { x =>
      Ok("You are logged in ;)")
    }.getOrElse(
      Unauthorized("You aren't logged in :c")
    )
  }
}