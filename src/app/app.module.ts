import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllBackComponent } from './Back/all-back/all-back.component';
import { SidebarComponent } from './Back/sidebar/sidebar.component';
import { NavbarComponent } from './Back/navbar/navbar.component';
import { SettingsSidebarComponent } from './Back/settings-sidebar/settings-sidebar.component';
import { FooterComponent } from './Back/footer/footer.component';
import { HomebackComponent } from './Back/homeback/homeback.component';
import { UsersComponent } from './Back/users/users.component';
import { TablesComponent } from './Back/tables/tables.component';
import { EventsComponent } from './Back/events/events.component';
import { InscriptionsComponent } from './Back/inscriptions/inscriptions.component';
import { PostsComponent } from './Back/posts/posts.component';
import { CommentsComponent } from './Back/comments/comments.component';
import { RendezvousComponent } from './Back/rendezvous/rendezvous.component';
import { GroupesComponent } from './Back/groupes/groupes.component';
import { CategoriesGroupeComponent } from './Back/categories-groupe/categories-groupe.component';
import { MessagesComponent } from './Back/messages/messages.component';
import { AllFrontComponent } from './Front/all-front/all-front.component';
import { HeaderComponent } from './Front/header/header.component';
import { HomeComponent } from './Front/home/home.component';
import { FooterFrontComponent } from './Front/footer-front/footer-front.component';
import { BlogComponent } from './Front/blog/blog.component';
import { BlogDetailsComponent } from './Front/blog-details/blog-details.component';
import { RendezvousFrontComponent } from './Front/rendezvous-front/rendezvous-front.component';
import { AboutComponent } from './Front/about/about.component';
import { ContactComponent } from './Front/contact/contact.component';
import { SignInComponent } from './Authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./Authentication/service/auth.interceptor";
import { ProfileComponent } from './Back/profile/profile.component';
import { ForgotPasswordComponent } from './Authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Authentication/reset-password/reset-password.component';
import { RegistrationStatsComponent } from './Back/registration-stats/registration-stats.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GroupeComponent } from './Front/groupe/groupe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupeChatComponent } from './Front/groupe-chat/groupe-chat.component';
import { FilterPipe } from './Back/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategorieComponent } from './Back/categorie/categorie.component';
import { MessageComponent } from './Back/message/message.component';
import { GroupesBackComponent } from './Back/groupes-back/groupes-back.component';



@NgModule({
  declarations: [
    AppComponent,
    AllBackComponent,
    SidebarComponent,
    NavbarComponent,
    SettingsSidebarComponent,
    FooterComponent,
    HomebackComponent,
    UsersComponent,
    TablesComponent,
    EventsComponent,
    InscriptionsComponent,
    PostsComponent,
    CommentsComponent,
    RendezvousComponent,
    GroupesComponent,
    CategoriesGroupeComponent,
    MessagesComponent,
    AllFrontComponent,
    HeaderComponent,
    HomeComponent,
    FooterFrontComponent,
    BlogComponent,
    BlogDetailsComponent,
    RendezvousFrontComponent,
    AboutComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegistrationStatsComponent,
    GroupeComponent,
    GroupeChatComponent,
    FilterPipe,
    CategorieComponent,
    MessageComponent,
    GroupesBackComponent,
  ],
  imports: [NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgbModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
