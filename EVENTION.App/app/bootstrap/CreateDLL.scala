package bootstrap

import java.io.{File, PrintWriter}

import javax.inject.Inject
import models.dbTypes._
import org.joda.time.DateTime
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import repositories.BaseRepository
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

private[bootstrap] class CreateDLL @Inject()
(protected val provider: DatabaseConfigProvider)
(implicit ec: ExecutionContext)
  extends BaseRepository(provider) {

  import profile.api._

  def createDLLScript(): Unit = {

    val schemas =
      businesses.schema ++
        businessUsers.schema ++
        categories.schema ++
        events.schema ++
        eventCategories.schema

    val writer = new PrintWriter("./conf/evolutions/default/1.sql")
    writer.write("# --- !Ups\n\n")
    schemas.createStatements.foreach(s => writer.write(s + ";\n"))
    //inserts.foreach(i => writer.write(i+ ";\n"))

    writer.write("\n\n# --- !Downs\n\n")
    schemas.dropStatements.foreach(s => writer.write(s + ";\n"))

    writer.close()
  }

  def insertIntoDatabase() = {
    val inserts = DBIO.sequence(Seq(businesses += Business(Some(1), "Evention"),
      categories += Category(Some(1), "Sport"),
      categories += Category(Some(2), "Kultura"),
      categories += Category(Some(3), "Koncert"),
      categories += Category(Some(4), "Targi"),
      categories += Category(Some(5), "Inne"),
      categories += Category(Some(6), "Hackaton"),
      businessUsers += BusinessUser(Some(1), "Bartosz Mikulski", 1),
      businessUsers += BusinessUser(Some(2), "Michał Włodarczyk", 1),
      businessUsers += BusinessUser(Some(3), "Agnieszka Rusin", 1),
      businessUsers += BusinessUser(Some(5), "Szymon Janowski", 1),
      events += Event(None,
        "Ogarnij Big Data",
        Some("Ogarnij Big Data z Żabką i wygraj nagrody!"),
        Some("https://ogarnijbigdata.pl/"),
        DateTime.now(),
        new DateTime(2019, 3, 21, 15, 10),
        new DateTime(2019, 3, 21, 16, 40),
        Some(1),
        Some("{}"),
        Some("Poznań, Piotrowo 2, sala 122 BT"),
        Some("http://www.lepszypoznan.pl/wp-content/uploads/2013/06/zabka-logo-RGB.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(1), 6),
      events += Event(None,
        "Juwenalia w Koninie",
        Some("Juwenalia w Koninie to coroczne celebrowanie Święta Młodości, organizowane przez Samorząd Studentów z Państwowej Wyższej Szkoły Zawodowej  w Koninie, które przyciąga nie tylko Studentów ale również całą młodzież z powiatu konińskiego oraz okolicznych miejscowości\nW tym roku bedziemy świętować po raz 19 !!. "),
        Some("http://www.pwsz.konin.edu.pl/pl/760/798/juwenalia-konin-2018"),
        DateTime.now(),
        new DateTime(2019, 5, 11, 10, 0),
        new DateTime(2019, 5, 12, 10, 0),
        Some(1),
        Some("{}"),
        Some("Konin, Amfiteatr Skarpa"),
        Some("http://www.pwsz.konin.edu.pl/userfiles/images/Fotografia%20na%20ca%C5%82ej%20stronie(9).jpg"),
        Some("Konin")
      ),
      eventCategories += EventCategory(Some(2), 2),
      eventCategories += EventCategory(Some(2), 3),
      events += Event(None,
        "Koncert Tuzy",
        Some("Tuza gra, sialala"),
        Some("https://pl.wikipedia.org/wiki/Pozna%C5%84_G%C5%82%C3%B3wny"),
        DateTime.now(),
        new DateTime(2019, 6, 11, 20, 0),
        new DateTime(2019, 6, 12, 6, 0),
        Some(1),
        Some("{}"),
        Some("Poznań, Poznań Main Station"),
        Some("https://st.depositphotos.com/2801331/3568/i/950/depositphotos_35689899-stock-photo-gopher-on-duty.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(3), 2),
      eventCategories += EventCategory(Some(3), 3)
    ))


    db.run(inserts)
  }

  createDLLScript()
  insertIntoDatabase()
}
