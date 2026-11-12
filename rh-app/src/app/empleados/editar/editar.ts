import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../empleado';
import { EmpleadoServicio } from '../empleado.servicio';

@Component({
  selector: 'app-editar',
  imports: [FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit {
  private empleadoService = inject(EmpleadoServicio);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };
  cargando = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.empleadoService.obtenerEmpleadoPorId(id).subscribe({
      next: (datos) => {
        this.empleado = datos;
        this.cargando.set(false);
      },
      error: (err) => console.error('Error al cargar el empleado', err)
    });
  }

  guardar(): void {
    console.log('guardar() ejecutado', this.empleado);
    this.empleadoService
      .editarEmpleado(this.empleado.idEmpleado, this.empleado)
      .subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: (err) => console.error('Error al editar empleado', err)
      });
  }
}
