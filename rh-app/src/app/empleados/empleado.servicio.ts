import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({ providedIn: 'root' })
export class EmpleadoServicio {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5001/api/empleados';

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseUrl);
  }

  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.baseUrl}/${id}`);
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    const { idEmpleado, ...sinId } = empleado; // quitamos el id antes de enviar
    return this.http.post<Empleado>(this.baseUrl, sinId);
  }

  editarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
  const { idEmpleado, ...datos } = empleado;   // el id ya va en la URL
  return this.http.put<Empleado>(`${this.baseUrl}/${id}`, {
    ...datos,
    sueldo: Number(datos.sueldo)               // "5000.00" -> 5000
  });
}

  eliminarEmpleado(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}