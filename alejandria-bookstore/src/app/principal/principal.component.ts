import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoLibrosComponent } from './catalogo-libros/catalogo-libros.component';
import { UsersService } from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  mi_carrito: any[] = [];
  subtotal: number = 0;

  user_type: number;
  editorial: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    public snackbar: MatSnackBar,) {
    this.user_type = -1;

    let token = sessionStorage.getItem('jwToken');
    if (token == 'el perro es admin, déjenlo pasar') {
      this.user_type = 1;
    }
    else if (token != null) {
      this.userService.decodeToken(token)
        .subscribe(data => {

          this.editorial = data;

          if (this.editorial.type == 'editorial' && this.editorial.status == 'activo') {
            this.user_type = 2;
          }
          else if (this.editorial.type == 'cliente') {
            this.user_type = 3;
          }
          else {
            this.user_type = 0;
          }
        }, error => {
          console.log(error)
          this.snackbar.open("Ocurrió un error al momento de recuperar el token del lado del administrador, por favor verifique", 'Aceptar', {
            duration: 2000
          });
          this.user_type = 0;
        })
    }
    else {
      this.user_type = 0;
    }
  }

  ngOnInit(): void {
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }

  agregarCarrito(libro: any, cantidad: number) {
    if (cantidad > 0) {
      libro['cantidad'] = cantidad;
      this.mi_carrito.push(libro);
      this.subtotal = this.mi_carrito.reduce((a, b) => a + (b.price * b.cantidad || 0), 0);
    }
  }

  eliminarCarrito(index: number) {
    this.mi_carrito.splice(index, 1);
    this.subtotal = this.mi_carrito.reduce((a, b) => a + (b.price * b.cantidad || 0), 0);
  }

}
