import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusService, Asiento } from '../../services/bus';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccion-asientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seleccion-asientos.html',
  styleUrls: ['./seleccion-asientos.css']
})
export class SeleccionAsientosComponent implements OnInit, OnDestroy {
  asientos: Asiento[] = [];
  nombreUsuario: string = '';
  asientoSeleccionado: number | null = null;
  mensajeAlerta: string = '';
  errorAlerta: string = '';
  private intervaloActualizacion: any;

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.cargarAsientos();
    // Actualizar el estado de los asientos cada 5 segundos para sincronizar el tiempo de bloqueo
    this.intervaloActualizacion = setInterval(() => {
      this.cargarAsientos();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervaloActualizacion) {
      clearInterval(this.intervaloActualizacion);
    }
  }

  cargarAsientos(): void {
    this.busService.obtenerAsientos().subscribe({
      next: (data) => {
        this.asientos = data;
      },
      error: (err) => {
        console.error('Error al cargar asientos', err);
      }
    });
  }

  seleccionarYBloquear(asiento: Asiento): void {
    if (asiento.estado !== 'disponible') {
      return; // Si está ocupado o bloqueado por otro, no se puede
    }

    if (!this.nombreUsuario.trim()) {
      this.errorAlerta = 'Por favor, ingresa tu nombre antes de seleccionar un asiento.';
      return;
    }

    this.errorAlerta = '';

    this.busService.bloquearAsiento(asiento.numero_asiento, this.nombreUsuario).subscribe({
      next: (res: any) => {
        this.mensajeAlerta = res.mensaje;
        this.asientoSeleccionado = asiento.numero_asiento;
        this.cargarAsientos(); // Recargar grilla
      },
      error: (err) => {
        this.errorAlerta = err.error.error || 'Error al bloquear el asiento.';
      }
    });
  }
}