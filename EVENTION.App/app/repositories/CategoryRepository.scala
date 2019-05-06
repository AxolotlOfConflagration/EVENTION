package repositories

import javax.inject.{Inject, Singleton}
import models.database.Category
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CategoryRepository @Inject() (provider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends
  BaseRepository(provider){
  import profile.api._

  def all(): Future[Seq[Category]] = db.run{
    categories.result
  }

  def get(id: Long): Future[Option[Category]] = db.run {
    categories.filter(_.id === id).result.headOption
  }

  def get(ids: Seq[Long]): Future[Seq[Category]] = db.run {
    categories.filter(_.id inSet ids).result
  }
}
