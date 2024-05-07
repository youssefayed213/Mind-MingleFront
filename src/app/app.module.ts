import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';





import { CommonModule } from '@angular/common'; // Import CommonModule

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

import { PostService } from './service/Post/post.service';
import { AddPostComponent } from './crud/add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { ListPostsComponent } from './crud/list-posts/list-posts.component';
import { UpdatePostComponent } from './crud/update-post/update-post.component';
import { StatComponent } from './Back/ForumStat/stat/stat.component';
import {AsyncPipe, DatePipe} from "@angular/common";

import {AddRendezVousComponent} from "./Crud/add-rendez-vous/add-rendez-vous.component";
import {AddFeedbackComponent} from "./Crud/add-feedback/add-feedback.component";
import {RendezVous} from "src/app/models/RendezVous";


import { ListRendezvousComponent } from './Crud/list-rendezvous/list-rendezvous.component';
import { UpdateRendezVousComponent } from './Crud/update-rendez-vous/update-rendez-vous.component';
import { ListRendezVousBackComponent } from './Crud/list-rendez-vous-back/list-rendez-vous-back.component';
import { UpdateRendezVousBackComponent } from './Crud/update-rendez-vous-back/update-rendez-vous-back.component';
import { ListFeedbackParRendezVousComponent } from './Crud/list-feedback-par-rendez-vous/list-feedback-par-rendez-vous.component';



import { EventComponent } from './event/event.component';
import { FronteventComponent } from './Front/frontevent/frontevent.component';

import { SignInComponent } from './Authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
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
    AddPostComponent,
    ListPostsComponent,
    UpdatePostComponent,
    StatComponent,
    UpdatePostComponent,
    AddFeedbackComponent,
    AddRendezVousComponent,
    ListRendezvousComponent,
    UpdateRendezVousComponent,
    ListRendezVousBackComponent,
    UpdateRendezVousBackComponent,
    ListFeedbackParRendezVousComponent,
    EventComponent,
    AppComponent,
    FronteventComponent,
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
    ]
,
  imports: [NgxPaginationModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

  ],
  providers: [DatePipe,PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
