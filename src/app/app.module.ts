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
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AdminbloglistComponent } from './admin-panel/adminbloglist/adminbloglist.component';
import { AdminblogeditComponent } from './admin-panel/adminblogedit/adminblogedit.component';
import { AdminblogstartComponent } from './admin-panel/adminblogstart/adminblogstart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InstagramUpdatesComponent } from './body/instagram-updates/instagram-updates.component';
import { FooterComponent } from './footer/footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { LatestPostComponent } from './body/latest-post/latest-post.component';
import { CategoriesComponent } from './body/categories/categories.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgxImageCompressService} from 'ngx-image-compress';
import { FamDetailsComponent } from './admin-panel/fam-details/fam-details.component';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortDescriptionPipe } from './pipes/short-description.pipe';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { UploadHeaderImagesComponent } from './admin-panel/upload-header-images/upload-header-images.component';

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
    AdminblogeditComponent,
    AdminblogstartComponent,
    PageNotFoundComponent,
    InstagramUpdatesComponent,
    FooterComponent,
    MenuComponent,
    LatestPostComponent,
    CategoriesComponent,
    FamDetailsComponent,
    ShortDescriptionPipe,
    AdminLoginComponent,
    UploadHeaderImagesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFontAwesomeModule,
    CarouselModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {positionClass:'toast-top-full-width', 
      closeButton: true,
      timeOut: 4000,
      enableHtml: true,
      progressAnimation: 'increasing'
      })
  ],
  providers: [NgxImageCompressService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
