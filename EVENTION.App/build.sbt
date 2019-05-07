name := "EventionApp"
organization := "com.evention"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

// Dependency Injection dependencies
libraryDependencies += guice
libraryDependencies ++= Seq(evolutions)

// Play dependencies
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.1" % Test
libraryDependencies += "com.typesafe.play" %% "play-slick" % "4.0.0"
libraryDependencies += "com.typesafe.play" %% "play-slick-evolutions" % "4.0.0"

// Joda Time dependencies
libraryDependencies += "com.typesafe.play" %% "play-json-joda" % "2.7.1"
//libraryDependencies += "com.github.nscala-time" %% "nscala-time" % "2.22.0"
libraryDependencies += "org.joda" % "joda-convert" % "1.7"
libraryDependencies += "joda-time" % "joda-time" % "2.7"
libraryDependencies += "com.github.tototoshi" %% "slick-joda-mapper" % "2.4.0"

// Database dependencies
libraryDependencies += "com.h2database" % "h2" % "1.4.197"

// Test dependencies
libraryDependencies += specs2 % Test

val playPac4jVersion = "8.0.0-SNAPSHOT"
val pac4jVersion = "3.6.1"
val playVersion = "2.7.2"

// Auth dependecies
libraryDependencies ++= Seq(
  ehcache,
  ws,
  "org.pac4j" %% "play-pac4j" % playPac4jVersion,
  "org.pac4j" % "pac4j-http" % pac4jVersion,
  "org.pac4j" % "pac4j-oauth" % pac4jVersion,
  "org.apache.shiro" % "shiro-core" % "1.4.0",
  "com.typesafe.play" % "play-cache_2.12" % playVersion,
)

// Faker
libraryDependencies += "com.github.stevenchen3" %% "scala-faker" % "0.1.1"

libraryDependencies += "com.byteowls" % "jopencage" % "1.2.1"

scalacOptions ++= Seq(
  "-feature",
  "-deprecation",
  "-Xfatal-warnings"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.evention.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.evention.binders._"

// Repository resolvers
resolvers ++= Seq(
  Resolver.mavenLocal,
  "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases",
  "Sonatype snapshots repository" at "https://oss.sonatype.org/content/repositories/snapshots/",
  "Shibboleth releases" at "https://build.shibboleth.net/nexus/content/repositories/releases/",
  "MuleSoft" at "https://repository.mulesoft.org/nexus/content/repositories/public/",
  "JCenter" at "http://jcenter.bintray.com/"
)