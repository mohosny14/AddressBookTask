import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private ToastrService: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.errors) {
          const errorMessages = Object.values(error.error.errors).flat();
          errorMessages.forEach((errorMessage: any) => {
            this.ToastrService.error(errorMessage);
          });
        } else if (error.error.message) {
          this.ToastrService.error(error.error.message);
        } else {
          // this.ToastrService.error(error.message);
          // this.ToastrService.error('No Internet Connection.');
        }

        return throwError(error);
      })
    );
  }
}
