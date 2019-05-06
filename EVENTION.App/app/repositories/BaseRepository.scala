package repositories

import com.github.tototoshi.slick.H2JodaSupport._
import javax.inject.{Inject, Singleton}
import models.database.{Business, BusinessUser, Category, Event, EventCategory, _}
import org.joda.time.DateTime
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

@Singleton
class BaseRepository @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

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

    def name = column[String]("name")

    def businessId = column[Long]("businessId")

    def business = foreignKey("fk_business", businessId, businesses)(_.id)

    def * = (id.?, name, businessId) <> ((BusinessUser.apply _).tupled, BusinessUser.unapply)
  }

  protected val businessUsers = TableQuery[BusinessUsers]

  protected class Categories(tag: Tag) extends Table[Category](tag, "categories") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def category = column[String]("category", O.Unique)

    def * = (id.?, category) <> ((Category.apply _).tupled, Category.unapply)
  }

  protected val categories = TableQuery[Categories]

  protected class Events(tag: Tag) extends Table[Event](tag, "events") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def shortDescription = column[Option[String]]("shortDescription")

    def longDescription = column[Option[String]]("longDescription")

    def creationDate = column[DateTime]("creationDate")

    def eventStart = column[DateTime]("eventStart")

    def eventEnd = column[DateTime]("eventEnd")

    def ownerId = column[Option[Long]]("ownerId")

    def geoJson = column[Option[String]]("geoJson")

    def address = column[Option[String]]("address")

    def imageSource = column[Option[String]]("imageSource")

    def city = column[Option[String]]("city")

    def * =
      (id.?, name, shortDescription, longDescription, creationDate, eventStart, eventEnd, ownerId, geoJson, address, imageSource, city) <>
        ((Event.apply _).tupled, Event.unapply)

    def owner = foreignKey("fk_owner", ownerId, businessUsers)(_.id.?)
  }

  protected val events = TableQuery[Events]

  protected class EventCategories(tag: Tag) extends Table[EventCategory](tag, "eventCategories") {
    def eventId = column[Long]("eventId")

    def categoryId = column[Long]("catId")

    def idx = index("EventCategoriesIndex", (eventId, categoryId), true)

    def event = foreignKey("fk_event", eventId, events)(_.id)

    def category = foreignKey("fk_category", categoryId, categories)(_.id)

    def * = (eventId.?, categoryId) <> ((EventCategory.apply _).tupled, EventCategory.unapply)
  }

  protected val eventCategories = TableQuery[EventCategories]

  protected class Users(tag: Tag) extends Table[User](tag, "users") {
    def id = column[Option[Long]]("id", O.PrimaryKey, O.AutoInc)

    def firstName = column[String]("firstName")

    def lastName = column[String]("lastName")

    def nick = column[Option[String]]("nick")

    def externalId = column[Option[String]]("externalId")

    def * = (id, firstName, lastName, nick, externalId) <> ((User.apply _).tupled, User.unapply)
  }

  protected val users = TableQuery[Users]

  protected class EventParticipants(tag: Tag) extends Table[EventParticipant](tag, "eventParticipant") {
    def eventId = column[Long]("eventId")

    def userId = column[Long]("userId")

    def singUpDate = column[DateTime]("singUpDate")

    def idx = index("EvenParticipantsIndex", (eventId, userId), unique = true)

    def * = (eventId, userId, singUpDate) <> ((EventParticipant.apply _).tupled, EventParticipant.unapply)
  }

  protected val eventParticipants = TableQuery[EventParticipants]

  protected class Recommendations(tag: Tag) extends Table[Recommendation](tag, "recommendations"){
    def userId = column[Long]("userId", O.PrimaryKey)

    def recommendation = column[String]("recommendation")

    def * = (userId, recommendation) <> ((Recommendation.apply _).tupled, Recommendation.unapply)
  }
  protected val recommendations = TableQuery[Recommendations]

  protected class Followers(tag: Tag) extends Table[Follower](tag, "followers"){
    def userId = column[Option[Long]]("userID")
    def followerId = column[Long]("followerID")
    def timestamp = column[DateTime]("timestamp")

    def * = (userId, followerId, timestamp) <> ((Follower.apply _).tupled, Follower.unapply)

    def idx = index("FollowersIndex", (userId, followerId), unique = true)
  }

  protected val followers = TableQuery[Followers]
  //endregion

  /**
    * Returns query that can be used to furthermore filter results.
    * Query operates on tuple in following format
    * (event, businessUserm business, category)
    */
  def eventsQuery = {

    val eventWithBusiness = for {
      ((event, user), business) <- events
        .join(businessUsers).on(_.ownerId === _.id)
        .join(businesses).on(_._2.businessId === _.id)
      //        .join(eventCategories).on(_.id === _.eventId)
      //        .join(categories).on(_._2.eventId === _.id)
    } yield (event, user, business)

    val query = for {
      (((event, user, business), _), category) <- eventWithBusiness
        .join(eventCategories).on(_._1.id === _.eventId)
        .join(categories).on(_._2.categoryId === _.id)
    } yield (event, user, business, category)

    query
  }

  def sql(): String = {
    businesses.schema.createStatements ++
      businessUsers.schema.createStatements ++
      categories.schema.createStatements ++
      events.schema.createStatements ++
      eventCategories.schema.createStatements ++
      users.schema.createStatements
  }.mkString(";\n") + ";\n--"
}