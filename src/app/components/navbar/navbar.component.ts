import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private httpService: AppService,
    private router: Router) { }

  ngOnInit(): void {
  }

  pagina() {
    this.cookieService.delete('Cookie')
    this.router.navigateByUrl("/login");
  }

}
