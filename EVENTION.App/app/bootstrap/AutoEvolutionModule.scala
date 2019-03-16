package bootstrap

import com.google.inject.AbstractModule

class AutoEvolutionModule extends AbstractModule{
  override protected def configure(): Unit = {
    bind(classOf[CreateDLL]).asEagerSingleton()
  }
}
