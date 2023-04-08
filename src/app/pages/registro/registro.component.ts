import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})


export class RegistroComponent implements OnInit {
  model!: NgbDateStruct;
  date!: NgbDateStruct;
  fechaNacimiento = ""
  fechaCompleta = false; //Atributo para comprobar que se ha seleccionado una fecha de nacimiento

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

  fechaError = false
  formatoCorreoError = false
  correoError = false
  usuarioError = false
  contraseniaError = false

  //Subir foto
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  base64String = ''

  
  
  

  


  constructor(private calendar: NgbCalendar, private httpService: AppService) { }

  ngOnInit(): void {
    this.selectToday()

    //<--Acciones y configuración de la barra de progreso y sus botones
    const stepButtons = document.querySelectorAll('.step-button');
    const progress = document.querySelector('#progress');
    Array.from(stepButtons).forEach((button, index) => {
      button.addEventListener('click', () => {
        progress?.setAttribute('value', (index * 100 / (stepButtons.length - 1)).toString());//there are 3 buttons. 2 spaces.

        stepButtons.forEach((item, secindex) => {
          if (index > secindex) {
            item.classList.add('done');
          }
          if (index < secindex) {
            item.classList.remove('done');
          }
        })
      })
    })
    //--->

  }

  // Función auxiliar: asigna la fecha seleccionada en el selector a la estructura de date
  onDateSelect(select: NgbDate) {
    this.date = select
    this.fechaCompleta = true
    document.getElementById('progressButton2')?.setAttribute("disabled", "")

  }

  // Función auxiliar: selecciona el día actual para limitar el rango de fechas posibles
  selectToday() {
    this.model = this.calendar.getToday();
  }

  fechaNacimientoCorrecta() {
    if (this.fechaCompleta) {
      this.fechaNacimiento = this.date.day + "%2F" + this.date.month + "%2F" + this.date.year
      this.httpService.getFechaValida(this.fechaNacimiento).subscribe({
        next: (response) => {
          this.fechaError = false
          console.log(response.cadena)
          document.getElementById('progressButton2')?.removeAttribute("disabled")
          document.getElementById('progressButton2')?.click()
        },
        error: (error) => {
          console.log(error);
          this.fechaError = true
          document.getElementById('progressButton2')?.setAttribute("disabled", "")

        },
      });

    }
  }

  camposObligatoriosCompletos() {
    return (this.email == "" || this.userName == "" || this.password == "" || this.password2 == "")
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

    //Comprueba que las contraseñas coincidan  
    this.contraseniaError = (this.password != this.password2)

    if (this.formatoCorreoError || this.usuarioError || this.correoError || this.contraseniaError) {
      document.getElementById('progressButton3')?.setAttribute("disabled", "")

    } else {
      document.getElementById('progressButton3')?.removeAttribute("disabled")
      document.getElementById('progressButton3')?.click()
    }
  }


  crearUsuario(){
    let body ={
      apellidos: this.apellidos,
      correo: this.email,
      fechaNacimiento: this.fechaNacimiento,
      foto: this.base64String,
      genero: this.sexo,
      introduccion: this.descripcion,
      localizacion: this.localizacion,
      nombre: this.nombre,
      nombreUsuario: this.userName,
      pais: this.pais,
      password: this.password
    }
    console.log(body)
    
    this.httpService.creaNuevoUsuario(body).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error);
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



}
