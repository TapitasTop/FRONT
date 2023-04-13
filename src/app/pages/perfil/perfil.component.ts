import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  email = ""
  userName = ""
  password = ""
  password2 = ""

  nombre = ""
  apellidos = ""
  sexo = ""
  pais = ""
  localizacion = ""
  descripcion = ""
  foto = ""

  //Variables de respaldo
  email2 = ""
  userName2 = ""
  nombre2 = ""
  apellidos2 = ""
  sexo2 = ""
  pais2 = ""
  localizacion2 = ""
  descripcion2 = ""
  foto2 = ""

  formatoCorreoError = false
  correoError = false
  usuarioError = false

  //Subir foto
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  base64String = ''

  modoEdicion = false

  constructor(private httpService: AppService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
    this.httpService.getUsuario(token).subscribe(
      (user) => {
        this.email = user.correo
        this.userName = user.nombreUsuario
        this.nombre = user.nombre
        this.apellidos = user.apellidos
        this.sexo = user.genero
        this.pais = user.pais
        this.localizacion = user.localizacion
        this.descripcion = user.introduccion
        this.foto = user.foto
        this.preview = "data:image/jpg;base64," + this.foto;

        this.email2 = user.correo
        this.userName2 = user.nombreUsuario
        this.nombre2 = user.nombre
        this.apellidos2 = user.apellidos
        this.sexo2 = user.genero
        this.pais2 = user.pais
        this.localizacion2 = user.localizacion
        this.descripcion2 = user.introduccion
        this.foto2 = user.foto
      },
      (error: any) => {
        const sessionCookie = this.cookieService.get('Cookie');
        if (!sessionCookie) {
          this.router.navigateByUrl("/login");
        }
        console.log(error);
      }
    );
  }

  

  camposObligatoriosCorrectos() {
    //Comprueba que el formato del mail es correcto
    this.httpService.getFormatoCorreo(this.email).subscribe({
      next: (response) => {
        this.formatoCorreoError = false
        console.log(response.cadena)
      },
      error: (error) => {
        console.log(error);
        this.formatoCorreoError = true
      },
    });

    //Comprueba que el mail no coincida con uno existente
    this.httpService.getUsuarioExiste(this.email).subscribe({
      next: (response) => {
        this.correoError = false
        console.log(response.cadena)
      },
      error: (error) => {
        console.log(error);
        this.correoError = true
      },
    });

    //Comprueba que el usuario no coincida con uno existente
    this.httpService.getUsuarioExiste(this.userName).subscribe({
      next: (response) => {
        this.usuarioError = false
        console.log(response.cadena)
      },
      error: (error) => {
        console.log(error);
        this.usuarioError = true
      },
    });
  }

  //Funcion para subir una imagen
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
          this.base64String = e.target.result.replace("data:", "").replace(/^.+,/, "");
          console.log(this.base64String)
          this.foto = this.base64String
        };

        reader.readAsDataURL(this.currentFile);


      }
    }
  }

  //Activa la edición de campos
  activarModoEdicion(){
    this.modoEdicion = true
    document.getElementById('email')?.removeAttribute("readonly")
    document.getElementById('userName')?.removeAttribute("readonly")
    document.getElementById('nombre')?.removeAttribute("readonly")
    document.getElementById('apellidos')?.removeAttribute("readonly")
    document.getElementById('sexo')?.removeAttribute("disabled")
    document.getElementById('pais')?.removeAttribute("readonly")
    document.getElementById('localizacion')?.removeAttribute("readonly")
    document.getElementById('descripcion')?.removeAttribute("readonly")
  }

  //Desactiva la edicion de campos
  cerrarModoEdicion(){
    this.modoEdicion = false
    document.getElementById('email')?.setAttribute("readonly", "")
    document.getElementById('userName')?.setAttribute("readonly", "")
    document.getElementById('nombre')?.setAttribute("readonly", "")
    document.getElementById('apellidos')?.setAttribute("readonly", "")
    document.getElementById('sexo')?.setAttribute("disabled", "")
    document.getElementById('pais')?.setAttribute("readonly", "")
    document.getElementById('localizacion')?.setAttribute("readonly", "")
    document.getElementById('descripcion')?.setAttribute("readonly", "")
  }

  //Llamadas a back para editar los datos; la variables de respaldo se actualizan
  guardarCambios(){
    this.email2 = this.email
    this.userName2 = this.userName
    this.nombre2 = this.nombre
    this.apellidos2 = this.apellidos
    this.sexo2 = this.sexo
    this.pais2 = this.pais
    this.localizacion2 = this.localizacion
    this.descripcion2 = this.descripcion
    this.foto2 = this.foto
    this.preview = "data:image/jpg;base64," + this.foto
  }

  //Se vuelve a las variables de respaldo
  cancelarCambios(){
    this.email = this.email2
    this.userName = this.userName2 
    this.nombre = this.nombre2
    this.apellidos = this.apellidos2 
    this.sexo = this.sexo2 
    this.pais = this.pais2
    this.localizacion = this.localizacion2 
    this.descripcion = this.descripcion2
    this.foto = this.foto2
    this.preview = "data:image/jpg;base64," + this.foto
  }

}
