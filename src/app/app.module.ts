import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CarouselModule } from '../../node_modules/ngx-bootstrap/carousel';
import { BodyComponent } from './body/body.component';
import { BlogContentComponent } from './blogs/blog-content/blog-content.component';
import { FashionListComponent } from './blogs/generic-blog-list/fashion-list/fashion-list.component';
import { BeautyListComponent } from './blogs/generic-blog-list/beauty-list/beauty-list.component';
import { FoodListComponent } from './blogs/generic-blog-list/food-list/food-list.component';
import { TravelListComponent } from './blogs/generic-blog-list/travel-list/travel-list.component';
import { environment } from '../environments/environment';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdminbloglistComponent } from './admin/admin-panel/adminbloglist/adminbloglist.component';
import { AdminblogdetailComponent } from './admin/admin-panel/adminblogdetail/adminblogdetail.component';
import { AdminblogeditComponent } from './admin/admin-panel/adminblogedit/adminblogedit.component';
import { AdminblogstartComponent } from './admin/admin-panel/adminblogstart/adminblogstart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InstagramUpdatesComponent } from './body/instagram-updates/instagram-updates.component';
import { FooterComponent } from './footer/footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { LatestPostComponent } from './body/latest-post/latest-post.component';
import { CategoriesComponent } from './body/categories/categories.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './sharedServices/token-interceptor.service';
import { AuthService } from './sharedServices/auth.service';
 
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BodyComponent,
    BlogContentComponent,
    FashionListComponent,
    BeautyListComponent,
    FoodListComponent,
    TravelListComponent,
    AdminPanelComponent,
    AdminbloglistComponent,
    AdminblogdetailComponent,
    AdminblogeditComponent,
    AdminblogstartComponent,
    PageNotFoundComponent,
    InstagramUpdatesComponent,
    FooterComponent,
    MenuComponent,
    LatestPostComponent,
    CategoriesComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFontAwesomeModule,
    CarouselModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,AuthService,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
