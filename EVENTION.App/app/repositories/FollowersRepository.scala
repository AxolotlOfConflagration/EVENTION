package repositories

import javax.inject.Inject
import models.database.{Feed, Follower, User}
import play.api.db.slick.DatabaseConfigProvider
import com.github.tototoshi.slick.H2JodaSupport._

import scala.concurrent.{ExecutionContext, Future}

class FollowersRepository @Inject()(provider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {

  import profile.api._

  def follow(follower: Follower): Future[Int] = {
    db.run {
      followers += follower
    }
  }

  def unfollow(userId: Long, toUnfollowId: Long): Future[Int] = {
    db.run {
      followers.filter(row => row.followerId === toUnfollowId && row.userId === userId).delete
    }
  }

  def following(userId: Long): Future[Seq[User]] = {
    val query = followers
      .filter(_.userId === userId)
      .join(users)
      .on((x, y) => x.followerId === y.id)
      .map(_._2)

    db.run {
      query.result
    }
  }

  def feed(userId: Long): Future[Seq[Feed]] = {
    val query = followers
      .filter(_.userId === userId)
      .join(users)
      .on((x, y) => x.followerId === y.id)
      .map(_._2)
      .join(eventParticipants)
      .on(_.id === _.userId)
      .join(events).on(_._2.eventId === _.id)
      .map(record => (record._1._1, record._2, record._1._2.singUpDate))

    db.run(query.result).map(seq => seq.map { case (user, event, date) => Feed(user, event, date) }.sortBy(-_.date.getMillis))
  }
}
