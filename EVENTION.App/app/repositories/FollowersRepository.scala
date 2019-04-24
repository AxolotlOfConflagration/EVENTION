package repositories

import javax.inject.Inject
import models.database.Follower
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

class FollowersRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {

  import profile.api._

  def follow(follower: Follower): Future[Int] = {
    db.run {
      followers.insertOrUpdate(follower)
    }
  }

  def unfollow(userId: Long, toUnfollowId: Long): Future[Int] = {
    db.run {
      followers.filter(row => row.followerId === toUnfollowId && row.userId === userId).delete
    }
  }

  def following(userId: Long): Future[Seq[Follower]] = {
    db.run{followers.filter(_.userId === userId).result}
  }
}
