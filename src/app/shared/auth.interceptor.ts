import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    
    if (req.url.includes('Utisateur/login')) {
      return next.handle(req);
    }
    const authReq = req.clone({
      setHeaders: {
        autorisation: `${authToken}`
      }
    });
    return next.handle(authReq);
  }
}
