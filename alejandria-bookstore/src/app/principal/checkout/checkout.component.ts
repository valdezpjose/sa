import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrincipalComponent } from '../principal.component';
import { UpdateBook } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  nombre_compra: string;
  apellido_compra: string;
  correo_compra: string;
  direccion_compra: string;
  telefono_compra: string;

  mi_carrito: any[] = [];
  total: number = 0;

  user_type: number;
  editorial: any;

  terminos_aceptados: boolean = false;

  constructor(
    private userService: UsersService,
    public snackbar: MatSnackBar,
    private padre: PrincipalComponent,
    private bookService: BooksService,
  ) {
    this.user_type = -1;

    this.nombre_compra = '';
    this.apellido_compra = '';
    this.correo_compra = '';
    this.direccion_compra = '';
    this.telefono_compra = '';



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
            console.log(this.editorial);
          }
          else if (this.editorial.type == 'cliente') {
            this.user_type = 3;
            this.nombre_compra = this.editorial.name
            this.apellido_compra = this.editorial.apellido
            this.correo_compra = this.editorial.email
            this.telefono_compra = this.editorial.telephone
            console.log(this.editorial);
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
    this.mi_carrito = this.padre.mi_carrito;
    this.total = this.mi_carrito.reduce((a, b) => a + (b.price * b.cantidad || 0), 0);
  }

  async realizarCompra() {
    if (this.mi_carrito.length > 0) {
      if (this.nombre_compra == '' || this.apellido_compra == '' || this.correo_compra == '' || this.direccion_compra == ''
        || this.telefono_compra == '' || this.terminos_aceptados == false) {
        this.snackbar.open("Por favor llene todos los campos y acepte los términos y condiciones para poder efectuar su compra", 'Aceptar', {
          duration: 2000
        });
      }
      else {

        let n = 0;
        for await (let libro of this.mi_carrito) {

          n++;

          let miLibro: UpdateBook = {
            name: libro.name,
            editorial: libro.editorial,
            data: {
              stock: libro.stock - libro.cantidad
            }
          }

          this.bookService.updateBook(miLibro)
            .subscribe(data => {
              console.log(data);

              if ( n == this.mi_carrito.length)
              {
                this.snackbar.open("Compra realizada correctamente", 'Aceptar', {
                  duration: 2000
                });
                this.mi_carrito.splice(0,this.mi_carrito.length);
                window.location.reload();
              }
            }, error => {
              console.log(error)
              this.snackbar.open("Error al realizar la compra. Por favor verifique de nuevo", 'Aceptar', {
                duration: 2000
              });
            })
        }
      }
    }
    else {
      this.snackbar.open("No hay ningún libro en su carrito de compras. Agregue algunos para continuar", 'Aceptar', {
        duration: 2000
      });
    }
  }

}
