import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
// export const authGuard: CanActivateFn = (route, state) => {
//    let router:Router
//   if (localStorage.getItem("token"))
//     return true;
//   else {
//     this.router.navigateByUrl('/login')
//     return false
//   }

// };
