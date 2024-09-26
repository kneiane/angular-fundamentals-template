import {Inject, Injectable, InjectionToken } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
});

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string){
    this.window.sessionStorage.setItem(TOKEN, token);
                                      //key : value
  }

  getToken(){
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
