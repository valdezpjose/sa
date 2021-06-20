import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  carrito : any = [];

  constructor(
      public snackbar: MatSnackBar,
        private router: Router
          ) 
    {
    let token = sessionStorage.getItem('jwToken');
    if (token != 'el perro es admin, déjenlo pasar')
    {
      this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
        duration: 1500
      });
      this.router.navigate(['login']);
    }
   }

  ngOnInit(): void {

  }

}
