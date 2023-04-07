import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: "app-bienvenida",
  standalone: true,
  imports: [NgbCarouselModule, NgIf, NgbModule],
  templateUrl: "./bienvenida.component.html",
  styleUrls: ["./bienvenida.component.css"]
})
export class BienvenidaComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(public userService: UsersService, public router: Router) {}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
  pagina() {
    this.router.navigateByUrl("/login");
  }  
}
