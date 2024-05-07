import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Ajoutez cette ligne pour importer FormsModule

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
    UpdatePostComponent, // Déclarez votre composant ici

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Ajoutez FormsModule ici
    HttpClientModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
