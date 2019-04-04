package repositories

import javax.inject.Inject
import models.database.{Event, EventCategory}
import play.api.db.slick.DatabaseConfigProvider
import com.github.tototoshi.slick.H2JodaSupport._
import models.database.{Category, Event, EventCategory}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Success, Try}

class EventRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends
  BaseRepository(provider) {

  import profile.api._

  def insert(event: Event): Future[Try[Event]] = {
    val insertEvent = (events returning events.map(_.id)
      into ((e, id) => e.copy(id = Option(id)))
      ) += event

    db.run(insertEvent.asTry.transactionally)
  }

  def insert(event: Event, categories: Seq[Long]): Future[Try[Event]] = {

    insert(event).map {
      case Success(e) =>
        val insertCategories = categories.map(cat => eventCategories += EventCategory(e.id, cat))
        db.run(DBIO.sequence(insertCategories))
        Success(e)
      case x => x
    }
  }

  def get(id: Long): Future[Option[(Event, Seq[Category])]] = {
    val select = events.filter(_.id === id).result.headOption

    val eventFuture = db.run[Option[Event]](select)
    val catsFuture = getCategories(id)

    eventFuture
      .zip(catsFuture)
      .map {
        case (Some(event), cats) => Option(event -> cats)
        case _ => None
      }
  }

  def getByBusiness(businessId: Long): Future[Seq[Event]] = {
    val select = for {
      e <- events if e.ownerId === businessId
    } yield e

    db.run(select.result)
  }

  def all(): Future[Seq[Event]] = db.run {
    events.result
  }

  def getCategories(eventId: Long): Future[Seq[Category]] = {
    val query = eventCategories
      .filter(_.eventId === eventId)
      .join(categories)
      .on(_.categoryId === _.id)
      .map(_._2)
      .result

    db.run(query)
  }

  def update(event: Event): Future[Try[Event]] = db.run {
    events
      .filter(_.id === event.id)
      .map(x => (x.id.?, x.name, x.shortDescription, x.longDescription, x.creationDate, x.eventStart, x.eventEnd, x.ownerId, x.geoJson, x.address, x.imageSource, x.city))
      .update(Event.unapply(event).get)
      .andThen(events
        .filter(_.id === event.id)
        .result
        .head
      ).asTry
  }

  def removeCategory(eventId: Long, categoryId: Long) = db.run {
    eventCategories.filter(e => e.categoryId === categoryId && e.eventId === e.eventId).delete
  }

  def addCategory(eventId: Long, categoryId: Long) = db.run {
    val q = eventCategories += EventCategory(Some(eventId), categoryId)
    q.asTry
  }

  def delete(id: Long) = db.run {
    eventCategories.filter(_.eventId === id).delete.andThen(
      events.filter(_.id === id).delete
    ).transactionally
  }
}
