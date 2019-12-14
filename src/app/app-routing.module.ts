import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogContentComponent } from './blogs/blog-content/blog-content.component';
import { FashionListComponent } from './blogs/generic-blog-list/fashion-list/fashion-list.component';
import { BeautyListComponent } from './blogs/generic-blog-list/beauty-list/beauty-list.component';
import { FoodListComponent } from './blogs/generic-blog-list/food-list/food-list.component';
import { TravelListComponent } from './blogs/generic-blog-list/travel-list/travel-list.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminblogstartComponent } from './admin/admin-panel/adminblogstart/adminblogstart.component';
import { AdminblogeditComponent } from './admin/admin-panel/adminblogedit/adminblogedit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';


const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'blogs', component: BlogsComponent, children:[
      { path: '', component: FashionListComponent },
      { path: 'fashion', component: FashionListComponent },
      { path: 'beauty', component: BeautyListComponent },
      { path: 'food', component: FoodListComponent },
      { path: 'travel', component: TravelListComponent },
      { path: '**', component: PageNotFoundComponent }
    ]},
  { path: 'content', component: BlogContentComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'admin',
    canActivate:[],
    component:AdminPanelComponent, children:[
    { path: '', component: AdminblogstartComponent },
    { path: 'new', component: AdminblogeditComponent },
    { path: '**', component: PageNotFoundComponent }
  ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
