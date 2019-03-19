package bootstrap

import java.io.{File, PrintWriter}

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import repositories.BaseRepository
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

private[bootstrap] class CreateDLL @Inject()
(protected val provider: DatabaseConfigProvider)
(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {

  def createDLLScript(): Unit = {
    import profile.api._

    val schemas =
      businesses.schema ++
      businessUsers.schema ++
      categories.schema ++
      events.schema ++
      eventCategories.schema

    val inserts =
      """
        |insert into "businesses"("id", "name") VALUES ( 1, 'Evention' );
        |
        |insert into "categories"("category") VALUES ('Sport'),('Kultura'),('Koncert'),('Targi');
        |
      """.stripMargin

    val writer = new PrintWriter("./conf/evolutions/default/1.sql")
    writer.write("# --- !Ups\n\n")
    schemas.createStatements.foreach( s => writer.write(s + ";\n"))
    writer.write(inserts)

    writer.write("\n\n# --- !Downs\n\n")
    schemas.dropStatements.foreach( s => writer.write(s + ";\n"))

    writer.close()
  }

  createDLLScript()
}
