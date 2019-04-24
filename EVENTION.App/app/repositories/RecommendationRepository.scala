package repositories

import javax.inject.Inject
import models.database.{Event, Recommendation}
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

class RecommendationRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {
  import profile.api._

  def addOrReplaceRecommendation(rec: Recommendation): Future[Int] = {
    db.run {
      recommendations
        .insertOrUpdate(rec)
    }
  }

  def getRecommendation(userId: Long): Future[Seq[Event]] = {
    val recs = Await.result[Option[Recommendation]](db.run{
      recommendations
        .filter(_.userId === userId)
        .result
        .headOption
    }, Duration.Inf).map(_.recommendations).getOrElse(Nil)

    db.run{
      events
        .filter(_.id inSet recs)
        .result
    }
  }
}