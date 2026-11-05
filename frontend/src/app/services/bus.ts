import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asiento {
  id: number;
  numero_asiento: number;
  estado: 'disponible' | 'bloqueado' | 'ocupado';
  bloqueado_hasta?: string;
  usuario_bloqueo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  obtenerAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/asientos`);
  }

  bloquearAsiento(numero_asiento: number, usuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/asientos/bloquear`, { numero_asiento, usuario });
  }
}