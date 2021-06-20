import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import { ModalEditUsuarioComponent } from './modal-edit-usuario/modal-edit-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  mis_clientes: any[];
  mis_editoriales: any[];

  constructor(
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
    public dialog: MatDialog
  ) {
    let token = sessionStorage.getItem('jwToken');
    if (token != 'el perro es admin, déjenlo pasar') {
      this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
        duration: 1500
      });
      this.router.navigate(['login']);
    }

    this.mis_clientes = [];
    this.mis_editoriales = [];

    this.userService.getAllPublishers()
      .subscribe(data => {

        this.mis_editoriales = data;
        console.log(this.mis_editoriales);

      }, error => {
        console.log(error)
        this.snackbar.open("Ocurrió un error al momento de obtener las editoriales del servidor, por favor inténtelo más tarde.", 'Aceptar', {
          duration: 2000
        });
      })


    this.userService.getAllClients()
      .subscribe(data => {

        this.mis_clientes = data;
        console.log(this.mis_clientes);

      }, error => {
        console.log(error)
        this.snackbar.open("Ocurrió un error al momento de obtener los clientes del servidor, por favor inténtelo más tarde.", 'Aceptar', {
          duration: 2000
        });
      })

  }

  ngOnInit(): void {
  }

  deleteUser(user: any) {
    let delUser = {
      email: user.email
    }
    this.userService.deleteUser(delUser)
      .subscribe(data => {
        console.log(data);
        this.snackbar.open(`Se elimino el usuario/editorial`, 'Aceptar', {
          duration: 2000
        });
        window.location.reload();
      }, error => {
        console.log(error);
        this.snackbar.open(`Ocurrió un error al momento de eliminar este usuario/editorial "${user.name}". Por favor intente más tarde`, 'Aceptar', {
          duration: 2000
        });
      })
  }

  updateUser(user: any, userType: boolean) {
    user['userType'] = userType;
    this.dialog
      .open(ModalEditUsuarioComponent, {
        data: user
      })
      .afterClosed()
      .subscribe((response: any) => {
        if (response.confirmation) {
          console.log(response.data)
          this.userService.updateUser(response.data).subscribe(data => {
            console.log(data);
            this.snackbar.open(`Se modifico el usuario/editorial`, 'Aceptar', {
              duration: 2000
            });
            window.location.reload();
          }, error => {
            if (error.status == 200) {
              this.snackbar.open(`Se modifico el usuario/editorial`, 'Aceptar', {
                duration: 2000
              });
              window.location.reload();
            }
            else {
              console.log(error);
              this.snackbar.open(`Ocurrió un error al momento de modificar este usuario/editorial "${user.name}". Por favor intente más tarde`, 'Aceptar', {
                duration: 2000
              });
            }

          });
        }
      });
  }

}
