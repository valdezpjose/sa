import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service'
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-editorial',
  templateUrl: './confirmar-editorial.component.html',
  styleUrls: ['./confirmar-editorial.component.css']
})
export class ConfirmarEditorialComponent implements OnInit {

  noConfirmadas: any;

  constructor(
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
    public dialog: MatDialog
  ) {

    let token = sessionStorage.getItem('jwToken');
    if (token != 'el perro es admin, déjenlo pasar') {
      this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
        duration: 2000
      });
      this.router.navigate(['login']);
    }

    this.userService.getUnconfirmedEditorials()
      .subscribe(data => {
        this.noConfirmadas = data
        console.log(data)
      }, error => {
        this.snackbar.open("Ocurrió un error al momento de obtener las editoriales no confirmadas", 'Aceptar', {
          duration: 2000
        });
        this.router.navigate(['login']);
      })
  }

  ngOnInit(): void {
  }


  acceptRequest(editorial: any) {

    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Aceptar la solicitud de la editorial "${editorial.name}"?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          let data = {
            'email': editorial.email,
            'data': {
              'status': 'activo'
            }
          }

          this.userService.updateUser(data)
            .subscribe(data => {
              console.log(data)
              this.snackbar.open(`La editorial "${editorial.name}" ha sido confirmada con éxito`, 'Aceptar', {
                duration: 2000
              });
              window.location.reload();
            }, error => {
              if (error.status == 200) {
                this.snackbar.open(`La editorial "${editorial.name}" ha sido confirmada con éxito`, 'Aceptar', {
                  duration: 2000
                });
                window.location.reload();
              }
              else{
                this.snackbar.open(`Ocurrió un error al momento de confirmar la editorial "${editorial.name}" por favor intente de nuevo`, 'Aceptar', {
                  duration: 2000
                });
              }
            })

        }
      });

  }




}
