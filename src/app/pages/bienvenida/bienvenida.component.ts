import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router'

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  constructor(private httpService: AppService, private router: Router, private userService: AppService) {
  }
  ngOnInit(): void {}

  pagina() {
    this.router.navigateByUrl("/login");
  }
}
