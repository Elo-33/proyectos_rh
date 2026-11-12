import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../empleado';
import { EmpleadoServicio } from '../empleado.servicio';

@Component({
  selector: 'app-agregar',
  imports: [FormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);

  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  guardar(): void {
    this.empleadoService.agregarEmpleado(this.empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => console.error('Error al agregar empleado', err)
    });
  }
}
