import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/services/books.service';
import { PrincipalComponent } from '../principal.component';
import { DialogoCantidadComponent } from 'src/app/dialogo-cantidad/dialogo-cantidad.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo-libros',
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {

  user_type: number;
  editorial: any;
  my_books: any;
  mis_categorias : any;
  mis_editoriales: any;

  mi_carrito : any = [];

  constructor(
    private userService: UsersService,
    public snackbar: MatSnackBar,
    private bookService: BooksService,
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

    this.bookService.getAllBooks()
      .subscribe(data => {
        this.my_books = data;
        console.log(this.my_books);
      }, error => {
        console.log(error);
        this.snackbar.open(`Ocurrió un error al momento de obtener los libros de la base de datos. Por favor inténtelo nuevamente`, 'Aceptar', {
          duration: 2000
        });
      })


      this.bookService.getGenres()
      .subscribe(data => {
        this.mis_categorias = data;
        console.log(this.mis_categorias);
      }, error => {
        console.log(error);
        this.snackbar.open(`Ocurrió un error al momento de obtener los géneros de la base de datos. Por favor inténtelo nuevamente`, 'Aceptar', {
          duration: 2000
        });
      })


      this.userService.getAllPublishers()
      .subscribe(data => {
        this.mis_editoriales = data;
        console.log(this.mis_editoriales);
      }, error => {
        console.log(error);
        this.snackbar.open(`Ocurrió un error al momento de obtener las editoriales de la base de datos. Por favor inténtelo nuevamente`, 'Aceptar', {
          duration: 2000
        });
      })

  }

  ngOnInit(): void {
  }

  agregarAlCarro(libro : any)
  {
    this.dialog
      .open(DialogoCantidadComponent, {
        data : {
          mensaje : `¿Cuántas copias desea adquirir del libro "<strong>${libro.name}</strong>"?`,
          max : libro.stock
        }
      })
      .afterClosed()
      .subscribe((resultado: any) => {
        if (resultado.resultado) {
          this.padre.agregarCarrito(libro,resultado.cantidad);
        }
      });
  }

}
