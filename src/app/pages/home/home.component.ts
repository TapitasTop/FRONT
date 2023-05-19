import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { bottom } from '@popperjs/core';


interface Degustacion {
  calificadorGusto: string,
  descripcion: string,
  fechaAlta: string,
  foto: string,
  media: 0,
  nombre: string,
  origen: string,
  tipoComida: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nombre = ""
  nombreUsuario = ""
  fotoUsuario = ""
  apellidos = ""
  correo = ""
  fechaNacimiento = ""
  genero = ""
  introduccion = ""
  localizacion = ""
  pais = ""
  password = ""
  fotoDegustacion: string[] = new Array();
  nombreDegustacion: string[] = new Array();
  degustacionG: Degustacion[] = []
  loading: boolean = true;

  ultimasEstadisticas = { labels: [0], datasets: [{ data: [0], label: '' }]};
  todasEstadisticas = { labels: [0], datasets: [{ data: [0], label: '' }]};
  textoBotonEstadisticas = "Ver estadísticas completas"
  soloRecientes=true
  
  //Inicializando la gráfica de las estadísticas
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
        position: bottom
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },
    layout: {
      padding: {
        top: 30
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Nº de degustaciones' },
      { data: [], label: 'Nº de locales' }
    ]
  };

  
  constructor(
    private cookieService: CookieService,
    private httpService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = { token: this.cookieService.get('Cookie')};
    console.log(this.cookieService.get('Cookie'))
    this.httpService.getUsuario(token).subscribe(
      (user) => {
        this.nombre = user.nombre, this.nombreUsuario = user.nombreUsuario, this.fotoUsuario = user.foto, this.apellidos = user.apellidos, this.correo = user.correo, this.fechaNacimiento = user.fechaNacimiento, this.genero = user.genero, this.introduccion = user.introduccion, this.localizacion = user.localizacion, this.pais = user.pais, this.password = user.password
      },
      (error: any) => {
        const sessionCookie = this.cookieService.get('Cookie');
        if (!sessionCookie) {
          this.router.navigate(["/login"]);
        }
        console.log(error);
      }
    );
    
    this.httpService.getUltimasEstadisticas(token).subscribe(
      (estadisticas) => {
        let fechas = []
        let n_locales = []
        let n_degustaciones = []
        for (var val of estadisticas){
          fechas.push(val.fecha)
          n_locales.push(val.n_Local)
          n_degustaciones.push(val.n_Degustacion)
        }
        this.ultimasEstadisticas = {
          labels: fechas,
          datasets: [
            { data: n_degustaciones, label: 'Nº de degustaciones' },
            { data: n_locales, label: 'Nº de locales' }
          ]
        };
        this.barChartData = this.ultimasEstadisticas
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.httpService.getEstadisticas(token).subscribe(
      (estadisticas) => {
        let fechas = []
        let n_locales = []
        let n_degustaciones = []
        for (var val of estadisticas){
          fechas.push(val.fecha)
          n_locales.push(val.n_Local)
          n_degustaciones.push(val.n_Degustacion)
        }
        this.todasEstadisticas = {
          labels: fechas,
          datasets: [
            { data: n_degustaciones, label: 'Nº de degustaciones' },
            { data: n_locales, label: 'Nº de locales' }
          ]
        };
      },
      (error: any) => {
        console.log(error);
      }
    );
    
    this.httpService.getListaDegFavsUsuarioOrdenadas(token).subscribe(
      (degustacion) => {
        let i = 0;
        while(i < degustacion.length) {
          this.fotoDegustacion.push(degustacion[i].foto);
          this.nombreDegustacion.push(degustacion[i].nombre);
          this.degustacionG.push(degustacion[i]);
          i = i + 1;
      }
    });
  }

  cambioEstadisticas(){
    if(this.soloRecientes){
      this.textoBotonEstadisticas = "Ver estadísticas de los últimos siete días"
      this.barChartData = this.todasEstadisticas
      this.soloRecientes = false
    }
    else{
      this.textoBotonEstadisticas = "Ver estadísticas completas"
      this.barChartData = this.ultimasEstadisticas
      this.soloRecientes = true
    }
  }

}
