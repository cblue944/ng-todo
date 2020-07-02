import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {FormsModule} from '@angular/forms';
import {AboutPageComponent} from './components/about-page/about-page.component';
import { registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import localeSv from '@angular/common/locales/sv-FI';
import { ConfigurationsBarComponent } from './components/configurations-bar/configurations-bar.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {TodosFirebaseService} from './services/todos-firebase.service';
import {TodosLocalStorageService} from './services/todos-localstorage.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

registerLocaleData(localeSv);

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TodoItemComponent,
    TodoListComponent,
    AboutPageComponent,
    ConfigurationsBarComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    TodosFirebaseService,
    TodosLocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
