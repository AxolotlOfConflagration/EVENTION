package repositories

import javax.inject.Inject
import models.database.{Business, BusinessUser, Category, Event, EventCategory, EventFilter, User}
import play.api.db.slick.DatabaseConfigProvider
import models.EventResult
import com.github.tototoshi.slick.H2JodaSupport._
import org.joda.time.DateTime
import slick.lifted.ColumnOrdered

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}
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

  def all(filter: EventFilter): Future[Seq[EventResult]] = {
    val byCity = filter.city match {
      case Some(city) => events.filter(_.city === city)
      case _ => events
    }

    val filtered = if (filter.categories.nonEmpty) byCity
      .join(eventCategories).on(_.id === _.eventId)
      .filter(_._2.categoryId inSet filter.categories)
      .map(_._1)
    else byCity

    val sortedIndices = filter.ordering match {
      case "creationDate" if filter.ascending => filtered.sortBy(_.creationDate.asc)
      case "creationDate" => filtered.sortBy(_.creationDate.desc)
      case "eventStart" if filter.ascending => filtered.sortBy(_.eventStart.asc)
      case "eventStart" => filtered.sortBy(_.eventStart.desc)
      case "eventEnd" if filter.ascending => filtered.sortBy(_.eventEnd.asc)
      case "eventEnd" => filtered.sortBy(_.eventEnd.desc)
      case _ => filtered
    }

    val indicesQuery = sortedIndices
      .drop(filter.beginning)
      .take(filter.count)
      .map(_.id)
      .result

    val indices = Await.result(db.run(indicesQuery), Duration.Inf)

    db.run(
      eventsQuery.filter(_._1.id inSet indices).result
    ).map {
      _
        .map { case (event, user, business, category) => EventResult(event, user, business, category :: Nil) }
        .groupBy(_.event.id.get)
        .mapValues(_.reduce(EventResult.reduce)).values
        .toSeq
        .sortBy(element => filter.ordering match {
          case "creationDate" if filter.ascending => element.event.creationDate.getMillis
          case "creationDate" => -element.event.creationDate.getMillis
          case "eventStart" if filter.ascending => element.event.eventStart.getMillis
          case "eventStart" => -element.event.eventStart.getMillis
          case "eventEnd" if filter.ascending => element.event.eventEnd.getMillis
          case "eventEnd" => -element.event.eventEnd.getMillis
          case _ => -element.event.id.getOrElse(0L)
        })
    }
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

  def removeCategory(eventId: Long, categoryId: Long): Future[Int] = db.run {
    eventCategories.filter(e => e.categoryId === categoryId && e.eventId === e.eventId).delete
  }

  def addCategory(eventId: Long, categoryId: Long): Future[Try[Int]] = db.run {
    val q = eventCategories += EventCategory(Some(eventId), categoryId)
    q.asTry
  }

  def delete(id: Long): Future[Int] = db.run {
    eventCategories.filter(_.eventId === id).delete.andThen(
      events.filter(_.id === id).delete
    ).transactionally
  }

  def participants(id: Long): Future[Seq[User]] = db.run {
    eventParticipants
      .filter(_.eventId === id)
      .join(users).on(_.userId === _.id)
      .map(_._2)
      .result
  }
}
