import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-cantidad',
  templateUrl: './dialogo-cantidad.component.html',
  styleUrls: ['./dialogo-cantidad.component.css']
})
export class DialogoCantidadComponent implements OnInit {

  titulo_libro : string = '';
  cantidad : number = 0;
  cantidad_max : number = 0;

  constructor(public dialogo: MatDialogRef<DialogoCantidadComponent>,
    @Inject(MAT_DIALOG_DATA) public parametros: any) { }

  ngOnInit(): void {
  }

  cerrarDialogo(): void {

    let resultado = {
      resultado : false,
      cantidad: 0
    }

    this.dialogo.close(resultado)
  }
  confirmado(): void {

    let resultado = {
      resultado : true,
      cantidad: this.cantidad
    }

    this.dialogo.close(resultado);
  }

  validacion(){
    if (this.cantidad < 0)
    {
      this.cantidad = 0;
    }
    else if (this.cantidad > this.parametros.max)
    {
      this.cantidad = this.parametros.max;
    }
  }


}
