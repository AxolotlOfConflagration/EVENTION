package repositories

import javax.inject.{Inject, Singleton}
import models.Event
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class EventRepository @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile]{
  import profile.api._

  private class Events(tag: Tag) extends Table[Event](tag, "events") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")

    def * = (id, name) <> ((Event.apply _).tupled, Event.unapply)
  }

  private val events = TableQuery[Events]

  def insert(event: Event): Future[Int] = db.run {
    events += event.copy(id=0)
  }

  def get(): Future[Seq[Event]] = db.run {
    events.result
  }

  def get(id: Long): Future[Option[Event]] = db.run {
    events.filter(_.id === id).result.headOption
  }
}
