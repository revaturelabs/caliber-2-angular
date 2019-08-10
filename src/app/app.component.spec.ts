import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/component/home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModule } from './User/user/user.module';
import { ErrorService } from './error-handling/services/error.service';
import { ErrorComponent } from './error-handling/error/error.component';
import { LastQualityAuditComponent } from './home/component/last-quality-audit/last-quality-audit.component';
import { ToolbarComponent } from './Assess-Batch/Components/toolbar/toolbar.component';
import { HomeToolbarComponent } from './home/component/home-toolbar/home-toolbar.component';
import { LastQualityAuditGraphComponent } from './home/component/last-quality-audit-graph/last-quality-audit-graph.component';
import { LastQualityAuditTableComponent } from './home/component/last-quality-audit-table/last-quality-audit-table.component';
import { BatchModalComponent } from './Assess-Batch/Components/toolbar/batch-modal/batch-modal.component';
import { HomeService } from './home/service/home.service';
import { LocationService } from './home/service/location.service';
import { QanoteService } from './home/service/qanote.service';
import { HomeModule } from './home-module/home-module.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ErrorComponent,
        LastQualityAuditComponent,
        ToolbarComponent,
        HomeToolbarComponent,
        LastQualityAuditGraphComponent,
        LastQualityAuditTableComponent,
        BatchModalComponent,
      ],
    imports: [
      AppRoutingModule,
      FormsModule,
      UserModule,
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/caliber' }, ErrorService, HomeService, LocationService, QanoteService
    ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Caliber | Performance Management'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Caliber | Performance Management');
  }));
});
