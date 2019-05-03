package controllers

import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import repositories.BusinessRepository

import scala.concurrent.ExecutionContext

class AuthController @Inject()
(
  repo: BusinessRepository,
  cc: ControllerComponents
)(implicit ec: ExecutionContext) extends AbstractController(cc) {

}
