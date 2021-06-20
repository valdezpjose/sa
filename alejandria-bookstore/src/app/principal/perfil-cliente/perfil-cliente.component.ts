import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActCliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  editable: boolean = false;

  user_type: number;
  editorial: any;

  nombr_usr: string;
  apell_usr: string;
  email_usr: string;
  telep_usr: string;
  passw_usr: string;
  confi_usr: string;

  constructor(private userService: UsersService,
    public snackbar: MatSnackBar,) {

    this.nombr_usr = '';
    this.apell_usr = '';
    this.email_usr = '';
    this.telep_usr = '';
    this.passw_usr = '';
    this.confi_usr = '';
    
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

            this.nombr_usr = this.editorial.name
            this.apell_usr = this.editorial.lastName
            this.email_usr = this.editorial.email
            this.telep_usr = this.editorial.telephone
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
    this.apell_usr = this.editorial.lastName
    this.email_usr = this.editorial.email
    this.telep_usr = this.editorial.telephone
  }

  aceptar() {
    if (this.nombr_usr == '' || this.apell_usr == '' || this.email_usr == '' || this.telep_usr == '') {
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
    let miCliente: ActCliente = {
      email: this.editorial.email,
      data: {
        name: this.nombr_usr,
        lastName: this.apell_usr,
        email: this.email_usr,
        telephone: this.telep_usr
      }
    }
    this.actualizar(miCliente);
  }

  actualizarDatos2() {
    let miCliente: ActCliente = {
      email: this.editorial.email,
      data: {
        name: this.nombr_usr,
        lastName: this.apell_usr,
        email: this.email_usr,
        telephone: this.telep_usr,
        password: this.passw_usr
      }
    }
    this.actualizar(miCliente);
  }

  actualizar(cliente: ActCliente) {
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
