import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModule } from './User/user/user.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
      ],
    imports: [
      AppRoutingModule,
      FormsModule,
      UserModule
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/caliber' }
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
