import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { DegustSearchMethod } from 'src/app/degust-search-method';

@Component({
  selector: 'app-nuevaDegustacion',
  templateUrl: './nuevaDegustacion.component.html',
  styleUrls: ['./nuevaDegustacion.component.css']
})
export class NuevaDegustacionComponent implements OnInit {
  //Nota
  rating = 0;

  //Variables establecimiento
  nombreLocal = ""
  direccion = ""

  //Variables tapa
  nombreTapa = ""
  descripcion = ""
  foto = ""
  origen = ""
  tipoComida = ""
  calificadores = ""
  favorito = false

  //Subir foto
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  base64String = ''

  //Lista restaurantes
  restaurantes: { direccion: string, nombre: string }[]
  localElegido: { direccion: string, nombre: string }

  degustaciones: {
    nombre: string,
    origen: string,
    decripcion: string,
    foto: string,
    media: number,
    tipoComida: string,
    fechaAlta: string,
    calificadorGusto: string
  }[] = []

  degustElegido: {
    nombre: string,
    origen: string,
    descripcion: string,
    foto: string,
    media: number,
    tipoComida: string,
    fechaAlta: string,
    calificadorGusto: string
  }
  selectLocales = []
  selectDegust = []

  searchInputLocales = ""
  searchInputDegusts = ""
  searchMethod: DegustSearchMethod = DegustSearchMethod.nombre

  constructor(private httpService: AppService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie') };

    this.httpService.getLocales().subscribe({
      next: (response) => {
        console.log(response)
        this.restaurantes = response
      },
      error: (error) => {
        console.log(error)
      }

    })
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

  guardarDegustacion() {
    let body = {
      calificacion: this.rating,
      degustacion: {
        calificadorGusto: this.calificadores,
        descripcion: this.descripcion,
        fechaAlta: "",
        foto: this.base64String,
        media: 0,
        nombre: this.nombreTapa,
        origen: this.origen,
        tipoComida: this.tipoComida
      },
      favorito: this.favorito,
      local: {
        direccion: this.direccion,
        nombre: this.nombreLocal
      },
      token: {
        token: this.cookieService.get('Cookie')
      }
    }
    console.log(body)

    this.httpService.aniadirDegustacion(body).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  updateDegusts() {
    this.degustaciones = []
    this.degustElegido = {
      nombre: "",
      origen: "",
      descripcion: "",
      foto: "",
      media: -1,
      tipoComida: "",
      fechaAlta: "",
      calificadorGusto: "",
    }
    this.localElegido = this.selectLocales[0]

    if (this.localElegido.nombre) {
      this.nombreLocal = this.localElegido.nombre
      this.direccion = this.localElegido.direccion
      this.httpService.getDegustacionesLocal(this.localElegido.nombre, this.localElegido.direccion).subscribe(
        (degusts) => {
          this.degustaciones = degusts
        },
        (error) => {
          console.log(error)
        }
      )
    }

  }

  forgetLocal() {
    this.localElegido = { nombre: "", direccion: "" }
    this.degustaciones = []
    this.degustElegido = {
      nombre: "",
      origen: "",
      descripcion: "",
      foto: "",
      media: -1,
      tipoComida: "",
      fechaAlta: "",
      calificadorGusto: "",
    }
  }


  rellenarDatos() {
    this.degustElegido = this.selectDegust[0];
    if (this.degustElegido.nombre) {
      this.nombreTapa = this.degustElegido.nombre
      this.calificadores = this.degustElegido.calificadorGusto
      this.descripcion = this.degustElegido.descripcion
      this.foto = this.degustElegido.foto
      this.origen = this.degustElegido.origen
      this.tipoComida = this.degustElegido.tipoComida
      this.preview = "data:image/jpg;base64," + this.foto;
    }
  }


}
