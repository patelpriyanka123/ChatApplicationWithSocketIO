import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatHistoryComponent } from './Chat/chat-history/chat-history.component';
import { ChatBoxComponent } from './Chat/chat-box/chat-box.component';
import { UserListComponent } from './Chat/user-list/user-list.component';
import { ChatHeaderComponent } from './Chat/chat-header/chat-header.component';
import { ChatMessageComponent } from './Chat/chat-message/chat-message.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegistrationComponent } from './Authentication/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserListComponent,
    ChatBoxComponent,
    ChatHistoryComponent,
    ChatHeaderComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
