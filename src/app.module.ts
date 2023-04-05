import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StartController } from './routes/start.controller';
import { DeathInServiceController } from './routes/death-in-service.controller';
import { EssentialInformationController } from './routes/essential-information.controller';
import { ServicepersonDetailsController } from './routes/serviceperson-details.controller';
import { DeathCertificateController } from './routes/death-certificate.controller';
import { ApplicantDetailsController } from './routes/applicant-details.controller';
import { ApplicantRelationshipController } from './routes/applicant-relationship.controller';
import { ApplicantNextOfKinController } from './routes/applicant-next-of-kin.controller';
import { CheckAnswersController } from './routes/check-answers.controller';
import { GlobalProperty } from './middleware/global-property.service';
import { ApplicationService, ConfigService } from './services';
import { Pathway } from './middleware/pathway.middleware';
import { SessionProvider } from './providers/session.provider';

@Module({
  imports: [],
  controllers: [
    AppController,
    StartController,
    DeathInServiceController,
    EssentialInformationController,
    ServicepersonDetailsController,
    DeathCertificateController,
    ApplicantDetailsController,
    ApplicantRelationshipController,
    ApplicantNextOfKinController,
    CheckAnswersController,
  ],
  providers: [AppService, ConfigService, ApplicationService, SessionProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalProperty).forRoutes('/*');
    consumer.apply(Pathway).forRoutes('/*');
  }
}
