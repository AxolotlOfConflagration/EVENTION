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
libraryDependencies += "com.github.nscala-time" %% "nscala-time" % "2.22.0"
libraryDependencies += "org.joda" % "joda-convert" % "1.7"
libraryDependencies += "com.github.tototoshi" %% "slick-joda-mapper" % "2.4.0"

// Database dependencies
libraryDependencies += "com.h2database" % "h2" % "1.4.197"

// Test dependencies
libraryDependencies += specs2 % Test

scalacOptions ++= Seq(
  "-feature",
  "-deprecation",
  "-Xfatal-warnings"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.evention.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.evention.binders._"
