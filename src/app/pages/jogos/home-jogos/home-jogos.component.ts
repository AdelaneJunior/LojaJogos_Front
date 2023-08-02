import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-home-jogos',
  templateUrl: './home-jogos.component.html',
  styleUrls: ['./home-jogos.component.css']
})
export class HomeJogosComponent implements OnInit{

  admin!:boolean;
  constructor(
    public securityService: SecurityService
  ) {
  }
  ngOnInit(): void {
    this.admin = !this.securityService.hasRoles(['ROLE_ADMIN']);
  }

}
