import {Component, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {SecurityService} from "../../arquitetura/security/security.service";
import {MessageService} from "../../arquitetura/message/message.service";

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  admin!:boolean;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private mensageService: MessageService,
    private securityService: SecurityService) {

  }

  ngOnInit(): void {
    if(this.securityService.credential.accessToken == ""){
      this.router.navigate(['/acesso']);
    }else {

      if (this.securityService.isValid()) {
        this.router.navigate(['/']);
        this.admin = !this.securityService.hasRoles(['ROLE_ADMIN'])
        console.log(this.securityService)
      }
      if (!this.securityService.isValid())
        this.router.navigate(['/acesso']);
    }
  }

  ngAfterViewInit() {
    console.log(this.admin)
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/login']);
  }
}
