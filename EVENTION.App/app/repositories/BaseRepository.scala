package repositories

import javax.inject.{Inject, Singleton}
import models._
import org.joda.time.DateTime
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import com.github.tototoshi.slick.H2JodaSupport._
import models.dbTypes.{Business, BusinessUser, Event}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class BaseRepository @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile]{
  import profile.api._

  //region Tables

  protected class Businesses(tag: Tag) extends Table[Business](tag, "businesses") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name", O.Unique)

    def * = (id.?, name) <> ((Business.apply _).tupled, Business.unapply)
  }

  protected val businesses = TableQuery[Businesses]

  protected class BusinessUsers(tag: Tag) extends Table[BusinessUser](tag, "businessUsers") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def businessId = column[Long]("businessId")

    def business = foreignKey("fk_business", businessId, businesses)(_.id)

    def * = (id, businessId) <> ((BusinessUser.apply _).tupled, BusinessUser.unapply)
  }

  protected val businessUsers = TableQuery[BusinessUsers]

  protected class Events(tag: Tag) extends Table[Event](tag, "events") {
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
      (id, name, shortDescription.?, longDescription.?, creationDate, eventStart, eventEnd, ownerId.?, geoJson.?, address.?, imageSource.?) <>
        ((Event.apply _).tupled, Event.unapply)

    def owner = foreignKey("fk_owner", ownerId, businessUsers)(_.id)
  }

  protected val events = TableQuery[Events]

  //endregion

  def sql(): String = {
      businesses.schema.createStatements ++
      businessUsers.schema.createStatements ++
      events.schema.createStatements
  }.mkString(";\n")+";"

//  def insert(event: Event): Future[Int] = db.run {
//    events += event.copy(id=0)
//  }
//
//  def all(): Future[Seq[Event]] = db.run {
//    events.result
//  }
//
//  def all(id: Long): Future[Option[Event]] = db.run {
//    events.filter(_.id === id).result.headOption
//  }
}