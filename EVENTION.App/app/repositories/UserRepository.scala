package repositories

import javax.inject.Inject
import models.database.{Category, Event, EventCategory, EventParticipant, Recommendation, User}
import play.api.db.slick.DatabaseConfigProvider
import com.github.tototoshi.slick.H2JodaSupport._
import org.joda.time.DateTime

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}
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

  def allEvents(userId: Long): Future[Seq[Event]] = {
    val query = eventParticipants
      .filter(_.userId === userId)
      .join(events)
      .on(_.eventId === _.id)
      .map(_._2)
      .sortBy(_.creationDate.desc)

    db.run(query.result)
  }

  def activeEvents(userId: Long, date: DateTime = DateTime.now): Future[Seq[Event]] = {
    val query = eventParticipants
      .filter(_.userId === userId)
      .join(events)
      .on(_.eventId === _.id)
      .map(_._2)
      .filter(_.eventStart >= date)
      .sortBy(_.eventStart.asc)

    db.run(query.result)
  }

  def pastEvents(userId: Long, date: DateTime = DateTime.now): Future[Seq[Event]] = {
    val query = eventParticipants
      .filter(_.userId === userId)
      .join(events)
      .on(_.eventId === _.id)
      .map(_._2)
      .filter(_.eventEnd < date)
      .sortBy(_.eventEnd.desc)

    db.run(query.result)
  }

  def singUpForEvent(userId: Long, eventId: Long): Future[Int] = {
    val participant = EventParticipant(eventId, userId)
    db.run(eventParticipants += participant)
  }

  def leaveEvent(userId: Long, eventId: Long): Future[Int] = {
    db.run {
      eventParticipants
        .filter(row => row.eventId === eventId && row.userId === userId)
        .delete
    }
  }
}
