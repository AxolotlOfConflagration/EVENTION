package modules

import com.google.inject.{AbstractModule, Provides}
import org.pac4j.core.client.Clients
import org.pac4j.core.config.Config
import org.pac4j.oauth.client.Google2Client
import org.pac4j.play.http.PlayHttpActionAdapter
import org.pac4j.play.scala.{DefaultSecurityComponents, SecurityComponents}
import org.pac4j.play.store.{PlayCookieSessionStore, PlaySessionStore, ShiroAesDataEncrypter}
import org.pac4j.play.{CallbackController, LogoutController}
import play.api.{Configuration, Environment}

class SecurityModule(env: Environment, conf: Configuration) extends AbstractModule{
  val baseUrl: String = conf.get[String]("base-url")

  override def configure(): Unit = {

    // Session configuration - all session data will be saved in cookie with AES encryption
    val secret = conf.get[String]("play.http.secret.key").substring(0,16)
    val dataEncryptor = new ShiroAesDataEncrypter(secret)
    val playSessionStore = new PlayCookieSessionStore(dataEncryptor)
    bind(classOf[PlaySessionStore]).toInstance(playSessionStore)

    // Security stuff
    bind(classOf[SecurityComponents]).to(classOf[DefaultSecurityComponents])

    // Callback
    val callbackController = new CallbackController()
    callbackController.setDefaultUrl("/?defaulturlafterlogout")
    callbackController.setMultiProfile(true)
    bind(classOf[CallbackController]).toInstance(callbackController)

    // Logout
    val logoutController = new LogoutController()
    logoutController.setDefaultUrl("http://localhost:3000")
    logoutController.setLocalLogout(true)
    logoutController.setCentralLogout(true)
    bind(classOf[LogoutController]).toInstance(logoutController)
  }

  @Provides
  def providesGoogleClient: Google2Client = {
    val key = conf.get[String]("google-key")
    val secret = conf.get[String]("google-secret")
    new Google2Client(key, secret)
  }

  @Provides
  def providesConfig(googleClient: Google2Client): Config = {
    val clients = new Clients(baseUrl+"/callback", googleClient)

    val config = new Config(clients)
    config.setHttpActionAdapter(new PlayHttpActionAdapter())
    config
  }
}
