package repositories

import javax.inject.{Inject, Singleton}
import models.Event
import org.joda.time.DateTime
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import com.github.tototoshi.slick.H2JodaSupport._

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class EventRepository @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile]{
  import profile.api._

  private class Events(tag: Tag) extends Table[Event](tag, "events") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def shortDescription = column[String]("shortDescription")
    def longDescription = column[String]("longDescription")
    def creationDate = column[DateTime]("creationDate")
    def eventStart = column[DateTime]("eventStart")
    def eventEnd = column[DateTime]("eventEnd")
    def ownerId = column [Long]("ownerId")
    def geoJson = column[String]("geoJson")
    def address = column[String]("address")
    def imageSource = column[String]("imageSource")

    def * =
      (id, name, shortDescription, longDescription, creationDate, eventStart, eventEnd, ownerId, geoJson, address, imageSource) <>
        ((Event.apply _).tupled, Event.unapply)
  }

  private val events = TableQuery[Events]

  def sql(): String = events.schema.createIfNotExistsStatements.mkString("\n")

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
