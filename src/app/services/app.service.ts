import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://jaime.hopto.org:8080';

  constructor(private http: HttpClient) { }

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

  //Llamada para enviar token y hacer login
  login(user: any): Observable<any> {
    return this.http.post(
      'http://jaime.hopto.org:8080/v1/user/perfil/login',
      user
    );
  }

    //Llamada para enviar token y hacer login
    forgotPassword(email: any): Observable<any> {
      return this.http.post(
        'http://jaime.hopto.org:8080/v1/user/perfil/recuperar',
        email
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

  //Llamada para devolver la lista de degustaciones favoritas ordenadas
  getListaDegFavsUsuarioOrdenadas(token: any): Observable<any> {
    return this.http.post(
      'http://jaime.hopto.org:8080/v1/user/listaDegFavsUsuarioOrdenadas',
      token
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

  //Editar los datos del perfil de usuario
  editarDatosPerfil(body: any){
    return this.http.put<any>(`${this.baseUrl}/v1/user/perfil/modificarDatos`, body)
  }

  //Añadir una nueva degustación con un local asociado y una valoración
  aniadirDegustacion(body: any){
    return this.http.post<any>(`${this.baseUrl}/v1/degustacion`, body)
  }

  //Devuelve una lista con todas las degustaciones
  getDegustaciones() {
    return this.http.get<any>(`${this.baseUrl}/v1/degustacion/listaDegustaciones`)
  }

  //Devuelve una lista las degustaciones por local
  getDegustacionesLocal(nombre: string, direccion: string) {
    return this.http.get<any>(`${this.baseUrl}/v1/degustacion/listaDegustacionesLocal?direccion=${direccion}&nombre=${nombre}`)
  }

  //Devuelve una lista de las degustaciones ordenadas por media
  getDegustacionesOrdenadas() {
    return this.http.get<any>(`${this.baseUrl}/v1/degustacion/listaDegustacionesOrdenadas`)
  }
  //Devuelve una lista de las degustaciones ordenadas por fecha de un usuario
  postDegustacionesUsuario(user: string) {
    return this.http.post<any>(`${this.baseUrl}/v1/degustacion/listaDegustacionesUsuario`, { "token": user })
  }
  //Devuelve una lista con todos los locales
  getLocales() {
    return this.http.get<any>(`${this.baseUrl}/v1/local/listaLocales`)
  }

  //Obtiene las estadisticas de los últimos siete días (nº de degustaciones y de locales) por token de usuario
  getUltimasEstadisticas(body: any){
    return this.http.post<any>(`${this.baseUrl}/v1/user/perfil/estadisticasDias`, body)
  }
  //Obtiene las estadisticas(nº de degustaciones y de locales) por token de usuario
  getEstadisticas(body: any){
    return this.http.post<any>(`${this.baseUrl}/v1/user/perfil/estadisticas`, body)
  }

}
