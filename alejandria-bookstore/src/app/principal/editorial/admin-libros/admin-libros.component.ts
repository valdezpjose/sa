import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service'
import { BooksService } from 'src/app/services/books.service';
import { GetBook, RegBook, UpdateBook } from 'src/app/models/book';
import { BookImg } from 'src/app/models/book';

import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-libros',
  templateUrl: './admin-libros.component.html',
  styleUrls: ['./admin-libros.component.css']
})
export class AdminLibrosComponent implements OnInit {

  //VARIABLE DONDE SE ALMACENA LA INFORMACIÓN DE LA EDITORIAL
  editorial: any;

  //ACA SE ALMACENAN LOS LIBROS DE LA EDITORIAL
  misLibros: any;

  //PARA ALMACENAR LA IMÁGEN
  imageSrc: string = '';

  //CAMPO PARA PODER AGREGAR NUEVOS GÉNEROS
  genre_input: string;

  //CAMPOS PARA CREAR UN LIBRO
  book_to_update : any;

  book_name: string;
  book_auth: string;
  book_syno: string;
  book_publ: string;
  book_imag: string;
  book_stoc: number;
  book_pric: number;

  misGeneros: string[] = [];
  misGenerosSelected: string[] = [];
  misGenerosSettings = {};

  constructor(
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
    private bookService: BooksService,
    public dialog: MatDialog) {
    let token = new String(sessionStorage.getItem('jwToken'));

    this.userService.decodeToken(token)
      .subscribe(data => {

        this.editorial = data;

        if (this.editorial.type != 'editorial') {
          this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
            duration: 2000
          });
          this.router.navigate(['login']);
        }
        else {
          let filtro: any = {
            editorial: {
              "$regex": this.editorial.name
            }
          }


          this.bookService.filterBooks(filtro)
            .subscribe(data => {

              this.misLibros = data;
              console.log(this.misLibros);

            }, error => {
              console.log(error);
              this.snackbar.open(`Ocurrió un error al momento de obtener los libros de la editorial "${this.editorial.name}". Por favor intente más tarde`, 'Aceptar', {
                duration: 2000
              });
            })
        }
      }, error => {
        this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
          duration: 2000
        });
        this.router.navigate(['login']);
      })
    //CAMPO DE CONTROL DE UPDATES
    this.book_to_update = null;

    //CAMPO PARA PODER AGREGAR NUEVOS GÉNEROS
    this.genre_input = '';

    //CAMPOS PARA CREAR UN LIBRO
    this.book_name = '';
    this.book_auth = '';
    this.book_syno = '';
    this.book_publ = '';
    this.book_imag = '';
    this.book_stoc = 0;
    this.book_pric = 0;

    this.misGenerosSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.bookService.getGenres()
      .subscribe(data => {

        this.misGeneros = data;

      }, error => {
        console.log(error)
        this.snackbar.open("Ocurrión un error al momento de intentar recuperar los géneros en el sistema", 'Aceptar', {
          duration: 1500
        });
      })


  }

  ngOnInit(): void {
  }


  addGenre() {
    if (this.genre_input != '') {
      if (!this.misGeneros.includes(this.genre_input)) {
        this.dialog
          .open(DialogoConfirmacionComponent, {
            data: `¿Está seguro de agregar el género "${this.genre_input}" a las opciones disponibles?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {
              this.misGeneros = this.misGeneros.concat(this.genre_input);
              this.misGenerosSelected = this.misGenerosSelected.concat(this.genre_input);
              this.snackbar.open("Género agregado correctamente", 'Aceptar', {
                duration: 1500
              });
              this.genre_input = '';
            }
          });


      }
      else {
        this.snackbar.open("El género ingresado se encuentra actualmente dentro de las opciones disponibles ", 'Aceptar', {
          duration: 1500
        });
      }
    }
    else {
      this.snackbar.open("El cámpo de género se encuentra en blanco", 'Aceptar', {
        duration: 1500
      });
    }
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

  saveBook() {
    if ( this.book_to_update ) {
      this.snackbar.open(`No puede guardar un libro ya existente de esta forma, seleccione modificar. (Darle aceptar recarga la pagina).`, 'Aceptar', {
      }).afterDismissed().subscribe( event => {
        window.location.reload();
      });
    } else if (this.imageSrc == '' || this.book_name == '' || this.misGenerosSelected.length == 0 || this.book_auth == ''
      || this.book_syno == '' || this.book_stoc < 0 || this.book_pric < 0) {
      this.snackbar.open("No puede dejar campos en blanco, y los espacios, para el precio y stock deben ser mayores o igual a cero", 'Aceptar', {
        duration: 1500
      });
    }
    else {
      let miImagen: BookImg = {
        editorial: this.editorial.name,
        bookName: this.book_name,
        image64: this.imageSrc
      }

      console.log("miImagen: " + miImagen)

      this.bookService.saveImgBook(miImagen)
        .subscribe(data => {

          console.log(data);

          if (data.statusCode == 200) {
            let miLibro: RegBook = {
              name: this.book_name,
              author: this.book_auth,
              synopsis: this.book_syno,
              genre: this.misGenerosSelected,
              editorial: this.editorial.name,
              stock: this.book_stoc,
              price: this.book_pric,
              image: data.body.url
            }

            console.log('miLibro: ' + miLibro);

            this.bookService.saveBook(miLibro)
              .subscribe(data => {
                console.log(data);
                this.snackbar.open("Libro registrado correctamente :D", 'Aceptar', {
                  duration: 1500
                });
                window.location.reload();
              }, error => {
                this.snackbar.open("Ocurrió un error al momento de registrar el libro, por favor verifique", 'Aceptar', {
                  duration: 1500
                });
              })

          }
          else {
            this.snackbar.open("Ocurrió un error al momento de recibir la respuesta del servidor al momento de guardar la imágen del libro", 'Aceptar', {
              duration: 2000
            });
          }

        }, error => {
          console.log(error);
          this.snackbar.open("Ocurrió un error al momento de guardar la imágen del libro", 'Aceptar', {
            duration: 2000
          });
        })
    }
  }

  loadBook(book : any) {
    this.book_to_update = book;

    this.book_name = book.name;
    this.book_auth = book.author;
    this.book_syno = book.synopsis;
    this.misGenerosSelected = book.genre;
    this.book_stoc = book.stock;
    this.book_pric = book.price;
  }

  updateBook(){
    if( this.book_to_update ){

      let miLibro: UpdateBook = {
        name: this.book_name,
        editorial: this.editorial.name,
        data: {
        }
      }

      if( this.imageSrc ){
          let miImagen: BookImg = {
            editorial: this.editorial.name,
            bookName: this.book_name,
            image64: this.imageSrc
          }

          console.log("miImagen: " + miImagen)

        this.bookService.saveImgBook(miImagen)
          .subscribe(data => {

          console.log(data);

          if (data.statusCode == 200) {
            miLibro.data = {
              author: this.book_auth,
              synopsis: this.book_syno,
              genre: this.misGenerosSelected,
              stock: this.book_stoc,
              price: this.book_pric,
              image: data.body.url
            }

            console.log('miLibro: ' + miLibro);

            this.bookService.updateBook(miLibro)
              .subscribe(data => {
                console.log(data);
                this.snackbar.open("Libro modificado correctamente :D", 'Aceptar', {
                  duration: 1500
                });
                window.location.reload();
              }, error => {
                this.snackbar.open("Ocurrió un error al momento de modificar el libro, por favor verifique", 'Aceptar', {
                  duration: 1500
                });
              })

          }
          else {
            this.snackbar.open("Ocurrió un error al momento de recibir la respuesta del servidor al momento de guardar la imágen del libro", 'Aceptar', {
              duration: 2000
            });
          }

        }, error => {
          console.log(error);
          this.snackbar.open("Ocurrió un error al momento de guardar la imágen del libro", 'Aceptar', {
            duration: 2000
          });
        })

      } else {
        miLibro.data = {
          author: this.book_auth,
          synopsis: this.book_syno,
          genre: this.misGenerosSelected,
          stock: this.book_stoc,
          price: this.book_pric,
          image: this.book_to_update.image
        }

        console.log('miLibro: ' + miLibro);

        this.bookService.updateBook(miLibro)
          .subscribe(data => {
            console.log(data);
            this.snackbar.open("Libro modificado correctamente :D", 'Aceptar', {
              duration: 1500
            });
            window.location.reload();
          }, error => {
            this.snackbar.open("Ocurrió un error al momento de modificar el libro, por favor verifique", 'Aceptar', {
              duration: 1500
            });
          })
      }
    } else {
      this.snackbar.open(`Seleccione un libro para editar.`, 'Aceptar', {
        duration: 2000
      });
    }
  }

  deleteBook(book : any){
    let delLibro : GetBook = {
      name: book.name,
      editorial : book.editorial
    }
    this.bookService.deleteBook(delLibro)
        .subscribe( data => {
          console.log(data);
          this.snackbar.open(`Se elimino el libro: "${book.name}".`, 'Aceptar', {
            duration: 2000
          });
          window.location.reload();
        }, error => {
          console.log(error);
          this.snackbar.open(`Ocurrió un error al momento de eliminar este libro "${book.name}". Por favor intente más tarde`, 'Aceptar', {
            duration: 2000
          });
        })
  }

}
