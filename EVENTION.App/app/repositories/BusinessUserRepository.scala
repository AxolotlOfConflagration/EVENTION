package repositories

import javax.inject.{Inject, Singleton}
import models.database.BusinessUser
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

@Singleton
class BusinessUserRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends
  BaseRepository(provider){
  import profile.api._

  def insert(user: BusinessUser): Future[Try[BusinessUser]] = db.run {
    val query = (businessUsers returning businessUsers.map(_.id)
      into ((b, id) => b.copy(id = Option(id)))
      ) += user

    query.asTry
  }

  def get(id: Long): Future[Option[BusinessUser]] = db.run {
    businessUsers.filter(_.id === id).result.headOption
  }

  def getByBusiness(businessId: Long): Future[Seq[BusinessUser]] = db.run {
    businessUsers.filter(_.businessId === businessId).result
  }

  def all(): Future[Seq[BusinessUser]] = db.run {
    businessUsers.result
  }

  def getEventionUsers(): Future[Seq[BusinessUser]] = db.run {
    businesses
      .filter(_.name === "Evention")
      .join(businessUsers)
      .on(_.id === _.businessId)
      .map(_._2)
      .result
  }

  def update(user: BusinessUser): Future[Try[BusinessUser]] = db.run {
    businessUsers
      .filter(_.id === user.id)
      .map(x => (x.id.?, x.name, x.businessId))
      .update(BusinessUser.unapply(user).get)
      .andThen(businessUsers
        .filter(_.id === user.id)
        .result
        .head
      ).asTry
  }

  def delete(id: Long) = db.run {
    businessUsers.filter(_.id === id).delete
  }
}
