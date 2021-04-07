import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessLevel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor (private auth : AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url, route.data.roles);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string, roles: AccessLevel[]): boolean | UrlTree {

    let output = false;

    if(this.auth.isConnected) {
      roles.forEach(r => {
        if (this.auth._currentUser.value.accessLevel == r) {
          output = true;
        }
      })
      if (!output) {
        alert("Vous n'avez pas les autorisations requises");
      }
      return output;
    }
    alert("Vous devez être connecté pour accéder à cette ressource");
    return this.router.parseUrl('/home');
  }
}
