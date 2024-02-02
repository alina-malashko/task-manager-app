import { AddTaskPopupComponent } from './components/add-task-popup/add-task-popup.component';
import { EditDatePopupComponent } from './components/edit-date-popup/edit-date-popup.component';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/tasks.effect';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    EditDatePopupComponent,
    AddTaskPopupComponent,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot(TasksEffects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
