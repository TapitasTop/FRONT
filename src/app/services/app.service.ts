import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://jaime.hopto.org:8080';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  login(user: any): Observable<any> {
    return this.http.post(
      'http://jaime.hopto.org:8080/v1/user/perfil/login',
      user
    );
  }

  //Llamada para devolver el usuario
  getUsuario(token: any): Observable<any> {
    return this.http.post(
      'http://jaime.hopto.org:8080/v1/user/perfil/obtener',
      token
    );
  }

  //Llamada para comprobar si la fecha de nacimiento es valida y el usuario es mayor de edad
  getFechaValida(fecha: string) {
    return this.http.get<{ cadena: string }>(
      `${this.baseUrl}/v1/user/perfil/fecha?fecha=${fecha}`
    );
  }

  //Comprueba que el formato del correo introducido es correcto
  getFormatoCorreo(correo: string) {
    return this.http.get<{ cadena: string }>(
      `${this.baseUrl}/v1/user/perfil/correo?email=${correo}`
    );
  }

  //Comprueba si ya existe un usuario con ese nombre o correo
  getUsuarioExiste(usuario: string) {
    return this.http.get<{ cadena: string }>(
      `${this.baseUrl}/v1/user/perfil/existe?user=${usuario}`
    );
  }

  //Crea un nuevo usuario (ejemplo POST)
  creaNuevoUsuario(body: any) {
    return this.http.post<any>(`${this.baseUrl}/v1/user/perfil`, body);
  }

  editarDatosPerfil(body: any){
    return this.http.put<any>(`${this.baseUrl}/v1/user/perfil/modificarDatos`, body)
  }

  //Devuelve una lista con todas las degustaciones
  getDegustaciones(){
    return this.http.get<any>(`${this.baseUrl}/v1/degustacion/listaDegustaciones`)
  }
}
