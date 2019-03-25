package repositories

import javax.inject.{Inject, Singleton}
import models.dbTypes.{Business, Event}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

@Singleton
class BusinessRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends
  BaseRepository(provider){
  import profile.api._

  def insert(business: Business): Future[Try[Business]] = db.run {
    val query = (businesses returning businesses.map(_.id)
      into ((b, id) => b.copy(id = Option(id)))
      ) += business

    query.asTry
  }

  def get(id: Long): Future[Option[Business]] = db.run {
    businesses.filter(_.id === id).result.headOption
  }

  def all(): Future[Seq[Business]] = db.run {
    businesses.result
  }

  def getEvention(): Future[Business] = db.run {
    businesses.filter(_.name === "Evention").result.head
  }

  def update(business: Business): Future[Try[Business]] = db.run {
      businesses
        .filter(_.id === business.id)
        .map(x => (x.id.?, x.name))
        .update(Business.unapply(business).get)
        .andThen(businesses
          .filter(_.id === business.id)
          .result
          .head
        ).asTry
  }

  def delete(id: Long): Future[Int] = db.run {
    businesses.filter(_.id === id).delete
  }
}
