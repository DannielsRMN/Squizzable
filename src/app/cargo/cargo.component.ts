import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { cargo } from '../../models/cargo.model';

@Component({
  selector: 'app-cargo',
  standalone: false,
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
  providers: [ApiService],
})
export class CargoComponent {
  cargos: cargo[] = [];
  visible: boolean = false;
  nuevoCargo: boolean = true;
  cargoDialogo: cargo = new cargo();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.obtenerCargo();
  }

  obtenerCargo() {
    this.api.getCargo().subscribe((res: cargo[]) => {
      this.cargos = res;
    });
  }

  editarCargo(cargo: cargo) {
    this.visible = true;
    this.nuevoCargo = false;
    this.cargoDialogo = { ...cargo }; 
  }

  eliminarCargo(cargo: cargo) {
    this.api.deleteCargo(cargo.idCargo.toString()).subscribe(() => {
      this.obtenerCargo();
    });
  }

  abrirCargo() {
    this.visible = true;
    this.nuevoCargo = true;
    this.cargoDialogo = new cargo();
  }

  guardarCargo() {
    if (this.nuevoCargo) {
      this.api.postCargo(this.cargoDialogo).subscribe(() => {
        this.obtenerCargo();
      });
    } else {
      this.api.putCargo(this.cargoDialogo).subscribe(() => {
        this.obtenerCargo();
      });
    }
    this.visible = false;
  }
}
