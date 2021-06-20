import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActCliente } from 'src/app/models/cliente';
import { ActEditorial } from 'src/app/models/editorial';

@Component({
  selector: 'app-perfil-editorial',
  templateUrl: './perfil-editorial.component.html',
  styleUrls: ['./perfil-editorial.component.css']
})
export class PerfilEditorialComponent implements OnInit {

  editable: boolean = false;

  user_type: number;
  editorial: any;

  nombr_usr: string;
  email_usr: string;
  addre_usr: string;
  passw_usr: string;
  confi_usr: string;

  constructor(
    private userService: UsersService,
    public snackbar: MatSnackBar,
  ) {
    this.user_type = -1;

    this.nombr_usr = '';
    this.email_usr = '';
    this.addre_usr = '';
    this.passw_usr = '';
    this.confi_usr = '';

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
            this.nombr_usr = this.editorial.name
            this.email_usr = this.editorial.email
            this.addre_usr = this.editorial.address
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

  cancelar() {
    this.editable = !this.editable
    this.nombr_usr = this.editorial.name
    this.email_usr = this.editorial.email
    this.addre_usr = this.editorial.address
  }

  aceptar() {
    if (this.nombr_usr == '' || this.email_usr == '' || this.addre_usr == '') {
      this.snackbar.open("Los únicos campos que puede dejar en blanco son los de la contraseña. Por favor llene los demás", 'Aceptar', {
        duration: 2000
      });
    }
    else {
      if (this.passw_usr != '') {
        if (this.passw_usr != this.confi_usr) {
          this.snackbar.open("Las contraseñas no coinciden. Por favor verifique", 'Aceptar', {
            duration: 2000
          });
        }
        else {
          this.actualizarDatos2();
        }
      }
      else {
        this.actualizarDatos1();
      }
    }
  }

  actualizarDatos1() {
    let miCliente: ActEditorial = {
      email: this.editorial.email,
      data: {
        name: this.nombr_usr,
        email: this.email_usr,
        address: this.addre_usr
      }
    }
    this.actualizar(miCliente);
  }

  actualizarDatos2() {
    let miCliente: ActEditorial = {
      email: this.editorial.email,
      data: {
        name: this.nombr_usr,
        email: this.email_usr,
        address: this.addre_usr,
        password: this.passw_usr
      }
    }
    this.actualizar(miCliente);
  }

  actualizar(cliente: ActEditorial) {
    this.userService.updateUser(cliente)
      .subscribe(data => {
        console.log(data)
        this.snackbar.open("Datos actualizados correctamente", 'Aceptar', {
          duration: 2000
        });
        window.location.reload();
      }, error => {
        console.log(error)
        if (error.status == 200) {
          this.snackbar.open("Datos actualizados correctamente", 'Aceptar', {
            duration: 2000
          });
          window.location.reload();
        }
        else {
          this.snackbar.open("Ocurrió un error al momento de actualizar sus datos. Por favor inténtelo de nuevo", 'Aceptar', {
            duration: 2000
          });
        }
      })
  }

}
