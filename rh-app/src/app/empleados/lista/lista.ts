import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoServicio } from '../empleado.servicio';

@Component({
  selector: 'app-lista',
  imports: [RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {
  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadoServicio);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (datos) => this.empleados.set(datos),
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }

  eliminar(empleado: Empleado): void {
    if (!confirm(`¿Eliminar a ${empleado.nombre}?`)) {
      return;
    }
    this.empleadoService.eliminarEmpleado(empleado.idEmpleado).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error('Error al eliminar empleado', err.error)
    });
  }
}
