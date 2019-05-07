package modules

import com.byteowls.jopencage.JOpenCageGeocoder
import com.google.inject.AbstractModule
import play.api.{Configuration, Environment}

class GeoCodingModule(env: Environment, conf: Configuration) extends AbstractModule{
  override def configure(): Unit = {
    val geoClient = new JOpenCageGeocoder(conf.get[String]("opencage-secret"))
    bind(classOf[JOpenCageGeocoder]).toInstance(geoClient)
  }
}
