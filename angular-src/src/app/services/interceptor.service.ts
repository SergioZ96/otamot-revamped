import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');

    if(token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `${token}`)
      });

      return next.handle(cloned);
    }
    else{
      return next.handle(req);
    }
  }
}
