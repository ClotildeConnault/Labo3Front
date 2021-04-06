import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (!request.headers.has("Authorization")) {
      console.log("Par ici");
      if (localStorage.getItem('token') != null) {
      console.log("Par là");

        let clone = request.clone({setHeaders : {"Authorization" : "Bearer " + localStorage.getItem('token')}});
        return next.handle(clone);
      } else {
        this.router.navigate(['login']).then();
        return next.handle(request);
      }
    }

    return next.handle(request);
  }
}
