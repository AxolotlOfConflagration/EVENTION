package repositories

import javax.inject.Inject
import models.database.{Category, Event, EventCategory, User}
import play.api.db.slick.DatabaseConfigProvider
import com.github.tototoshi.slick.H2JodaSupport._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Success, Try}

class UserRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {
  import profile.api._

  def insert(user: User): Future[Try[User]] = db.run {
    val query = (users returning users.map(_.id)
      into ((b, id) => b.copy(id = id))
      ) += user

    query.asTry
  }

  def get(id: Long): Future[Option[User]] = db.run {
    users.filter(_.id === id).result.headOption
  }

  def all(): Future[Seq[User]] = db.run {
    users.result
  }

  def update(user: User): Future[Try[User]] = db.run {
    users
      .filter(_.id === user.id)
      .map(x => (x.id, x.firstName, x.lastName, x.nick, x.externalId))
      .update(User.unapply(user).get)
      .andThen(users
        .filter(_.id === user.id)
        .result
        .head
      ).asTry
  }

  def delete(id: Long): Future[Int] = db.run {
    users.filter(_.id === id).delete
  }
}
