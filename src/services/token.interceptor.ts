import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    // No agregar token si es la URL de login
    if (token && !req.url.includes('/api/login/')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'X-API-KEY' : 'jnxAAq7a65wzXyQ3qPPF'
        }
      });
    }

    if (req.url.includes('/api/login/')) {
      req = req.clone({
        setHeaders: {
          'X-API-KEY' : 'jnxAAq7a65wzXyQ3qPPF'
        }
      });
    }

    return next.handle(req);
  }
}
