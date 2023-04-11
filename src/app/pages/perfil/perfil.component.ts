import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  email = "uncorreodeejemplo@example.com"
  userName = "nombreUsuarioEjemplo"
  password = ""
  password2 = ""

  nombre = "Nombre"
  apellidos = "Apellido1 Apellido2"
  sexo = "Femenino"
  pais = "España"
  localizacion = "Campus Montegancedo, Madrid"
  descripcion = "Esto es una descripción de ejemplo"

  fechaError = false
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

  constructor(private httpService: AppService) { }

  ngOnInit(): void {
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
        };

        reader.readAsDataURL(this.currentFile);


      }
    }
  }

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

}
