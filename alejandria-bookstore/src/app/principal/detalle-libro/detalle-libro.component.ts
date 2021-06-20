import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/services/books.service';
import { GetBook } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { PrincipalComponent } from '../principal.component';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  cantidad : number = 0 ;

  user_type: number;
  editorial: any;

  nombre_libro : string;
  editorial_libro : string;

  mi_libro : any;

  constructor(
    private userService: UsersService,
    public snackbar: MatSnackBar,
    private bookService: BooksService,
    private route: ActivatedRoute,
    private padre: PrincipalComponent,
    public dialog: MatDialog 
  ) {
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

    this.nombre_libro = this.route.snapshot.params['nombre'];
    this.editorial_libro = this.route.snapshot.params['editorial'];

    let data : GetBook = {
      editorial : this.editorial_libro,
      name : this.nombre_libro
    }

    this.bookService.getBook(data)
      .subscribe(data => {
        this.mi_libro = data;
        console.log(this.mi_libro);
      }, error => {
        console.log(error);
        this.snackbar.open(`Ocurrió un error al momento de obtener el libro . Por favor inténtelo nuevamente`, 'Aceptar', {
          duration: 2000
        });
      })
  }

  ngOnInit(): void {
  }

  agregarAlCarro()
  {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Agregar <strong>${this.cantidad}</strong> copias del libro <strong>${this.mi_libro.name}</strong> al carrito de compras?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          this.padre.agregarCarrito(this.mi_libro,this.cantidad);

        }
      });

    
  }

  validacion(){
    if (this.cantidad < 0)
    {
      this.cantidad = 0;
    }
    else if (this.cantidad > this.mi_libro['stock'])
    {
      this.cantidad = this.mi_libro['stock'];
    }
  }

}
