import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '../services/interceptors/httpInterceptor';
import { AuthService} from '../services/interceptors/tokenInterceptor'
import { DynamiConfigService } from '../services/dynami-config.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
export function initializeApp(config: DynamiConfigService) {
  return () => config.loadConfig();
}
export function loadConfig(configService: DynamiConfigService) {
  return () => configService.loadConfig();
}
export const appConfig: ApplicationConfig = {
  providers: [
       provideAnimations(),
    provideToastr(),
     provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([AuthService])),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideZoneChangeDetection
    ({ eventCoalescing: true }), 
    
    provideRouter(routes), provideAnimationsAsync(),
    
    DynamiConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [DynamiConfigService],
      multi: true
    },
     provideAnimationsAsync(),
     provideToastr({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        preventDuplicates: true,
      }),
  ],

    
};
