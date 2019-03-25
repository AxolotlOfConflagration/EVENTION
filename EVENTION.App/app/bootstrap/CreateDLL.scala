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
        "Projekcja filmu \"Śniegi Kilimandżaro\" (Les neiges du Kilimanjaro)",
        Some("Wydarzenie w ramach XXIX Dni Kultury Francuskiej i Frankofonii."),
        Some("Wydarzenie w ramach XXIX Dni Kultury Francuskiej i Frankofonii. \nMichel i Marie-Claire są małżeństwem od trzydziestu lat, mają udaną rodzinę, są aktywni i szczęśliwi, pomimo faktu, że Michel niedawno stracił pracę. Ich życie zakłóci napad rabunkowy, którego sprawcy najwyraźniej nie działali na oślep. Kameralna opowieść filmowa Roberta Guédiguiana, Marsylczyka o ormiańskich korzeniach, w której występują m.in. Ariane Ascaride -jego muza i żona i Jean-Pierre Darroussin. Fabuła toczy się w ulubionym przez reżysera marsylskim otoczeniu. \nWstęp wolny.\nFilm udostępniony przez Instytut Francuski w Polsce.\nOrganizator: Dom Bretanii.\nZobacz bit.ly/DBfrankofonia"),
        DateTime.now(),
        new DateTime(2019, 3, 21, 15, 10),
        new DateTime(2019, 3, 21, 16, 40),
        Some(1),
        Some("{}"),
        Some("Dom Bretanii, ul. Stary Rynek 37 (wejście od ul. Wielkiej), Poznań"),
        Some("http://www.poznan.pl/mim/events/pictures/kadr-z-filmu,pic1,1225,0,222232,with-dims,150,150.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(1), 6),
      events += Event(None,
        "Koncert #316 ZU, Man Forever",
        Some("Dziewiętnaście lat działalności ZU, polegającej w głównej mierze na żonglowaniu i \"maltretowaniu\" przeróżnych gatunków muzycznych, zaowocowało wyjątkowymi albumami wydanymi pod skrzydłami takich kultowych wytwórni jak: Ipecac, Atavistic czy japońska Headz. Eksperymentalne połączenie jazzu, noise'u, metalu, punka i awangardy sprawiło, że uznany kompozytor John Zorn opisał ich brzmienie jako pełną mocy i ekspresji muzykę, która kompletnie miażdży dorobek większości współczesnych zespołów."),
        Some("ZU (Włochy)\nDziewiętnaście lat działalności ZU, polegającej w głównej mierze na żonglowaniu i \"maltretowaniu\" przeróżnych gatunków muzycznych, zaowocowało wyjątkowymi albumami wydanymi pod skrzydłami takich kultowych wytwórni jak: Ipecac, Atavistic czy japońska Headz. Eksperymentalne połączenie jazzu, noise'u, metalu, punka i awangardy sprawiło, że uznany kompozytor John Zorn opisał ich brzmienie jako pełną mocy i ekspresji muzykę, która kompletnie miażdży dorobek większości współczesnych zespołów.\nW pogoni za tytułem najbardziej pracowitego zespołu świata ZU zagrało ponad 2000 koncertów w Europie, Stanach Zjednoczonych, Kanadzie, Azji, Rosji, Meksyku, a nawet w Afryce, będąc w trasie z muzykami pokroju Mike'a Pattona (jako Zu/Patton Quartet) i dzieląc scenę z Faith No More, Fantomas, The Melvins, Lightning Bolt, Sonic Youth czy The Ex. Współpracowali również z takimi wykonawcami jak: Dälek, Jim O' Rourke, NoMeansNo, FM Einheit (Einsturzende Neubauten), Peter Brötzmann, Eugene S. Robinson (Oxbow), Steve MacKay (The Stooges), Thurston Moore i Stephen O'Malley.\nMan Forever (USA)\nMan Forever to projekt perkusisty Johna Colpittsa (aka Kid Millions, Oneida, People of the North). Jego nowy album Play What They Want wymyka się klasyfikacjom gatunkowym. Podstawą są napędzające muzykę, wyszukane układy perkusyjne (stworzone razem z Tigue), ale na nowej płycie są wzbogacane wokalem i melodią dzięki udziałowi Laurie Anderson, Yo La Tengo oraz Mary Lattimore, aby wymienić tylko kilku gości. Play What They Want stanowi kulminację 25-letniego zaangażowania muzycznego jednego z najważniejszych nowojorskich perkusistów.\nBilety w cenie 40 zł."),
        DateTime.now(),
        new DateTime(2019, 5, 11, 10, 0),
        new DateTime(2019, 5, 12, 10, 0),
        Some(1),
        Some("{}"),
        Some("Pawilon, ul. Ewangelicka 1, Poznań"),
        Some("http://www.poznan.pl/mim/events/pictures/a,pic1,1225,0,221789,with-dims,150,150.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(2), 2),
      events += Event(None,
        "Finał Festiwalu Młodego Teatru Wielkopolski",
        Some("Finał XIV Festiwalu Młodego Teatru Wielkopolski \"Dzień Dobry Sztuko\"."),
        Some("Finał XIV Festiwalu Młodego Teatru Wielkopolski \"Dzień Dobry Sztuko\".\nW tym roku wzięło udział 20 grup teatralnych z całej Wielkopolski. W CK Zamek zaprezentuje się 10 zespołów. W Festiwalu biorą udział grupy teatralne działające w szkołach, ośrodkach kultury, świetlicach itp.\nWstęp wolny."),
        DateTime.now(),
        new DateTime(2019, 5, 11, 10, 0),
        new DateTime(2019, 5, 12, 10, 0),
        Some(1),
        Some("{}"),
        Some("CK Zamek, Sala Wielka, ul. Święty Marcin 80/82, Poznań"),
        Some("http://www.poznan.pl/mim/events/pictures/plakat,pic1,1225,0,224478,with-dims,150,150.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(2), 3),
      events += Event(None,
        "Koncert w Szkole u Szeligowskiego: duet Jarosław Nadrzycki i Joanna Zathey",
        Some("Kolejny Koncert w Szkole u Szeligowskiego, którego wykonawcami będą znakomici artyści - Jarosław Nadrzycki (skrzypce) i Joanna Zathey (fortepian)."),
        Some("Kolejny Koncert w Szkole u Szeligowskiego, którego wykonawcami będą znakomici artyści - Jarosław Nadrzycki (skrzypce) i Joanna Zathey (fortepian).\nW programie: Johannes Brahms - Sonata na fortepian i skrzypce G-dur op. 78, Sergiusz Rachmaninow - Romans op. 6 nr 1 Vocalise, Aleksander Głazunow - Medytacja, Karol Szymanowski - Romans op. 23, Henryk Wieniawski- Polonez brillante D-dur op. 4, Johannes Brahms - Scherzo c-moll, Fritz Kreisler - Caprice Viennoise.\nWstęp wolny\nKoncert odbywa się w ramach projektu \"Pośrodku Śródki 2019\" współfinansowanego z budżetu Miasta Poznania."),
        DateTime.now(),
        new DateTime(2019, 5, 11, 10, 0),
        new DateTime(2019, 5, 12, 10, 0),
        Some(1),
        Some("{}"),
        Some("Sala koncertowa POSM I st. nr 2, ul. Bydgoska 4, Poznań"),
        Some("http://www.poznan.pl/mim/events/pictures/joanna-zathey-i-jaroslaw-nadrzycki,pic1,1225,0,224615,with-dims,150,150.jpg"),
        Some("Poznań")
      ),
      eventCategories += EventCategory(Some(2), 3),
    ))


    db.run(inserts)
  }

  createDLLScript()
  insertIntoDatabase()
}
