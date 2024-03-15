// config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json'; // Ruta al archivo de configuración

  constructor(private http: HttpClient) { }

  // Método para cargar el archivo de configuración
  getConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }
}
