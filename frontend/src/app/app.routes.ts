import { Routes } from '@angular/router';
import { SeleccionAsientosComponent } from './components/seleccion-asientos/seleccion-asientos';

export const routes: Routes = [
    { path: '', component: SeleccionAsientosComponent },
  
  { path: '**', redirectTo: '' }
];
