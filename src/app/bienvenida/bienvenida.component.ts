import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bienvenida",
  templateUrl: "./bienvenida.component.html",
  styleUrls: ["./bienvenida.component.css"]
})
export class BienvenidaComponent implements OnInit {
  constructor(public userService: UsersService, public router: Router) {}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
  pagina() {
    this.router.navigateByUrl("/login");
  }  
}