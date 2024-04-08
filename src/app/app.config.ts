import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appEffects, appStore } from '../store/store';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ToDoService } from '../store/service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appStore),
    provideEffects(appEffects),
    ToDoService,
    provideRouter(routes)]
};
