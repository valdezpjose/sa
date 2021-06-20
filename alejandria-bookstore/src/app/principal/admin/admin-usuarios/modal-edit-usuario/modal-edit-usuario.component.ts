import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-usuario',
  templateUrl: './modal-edit-usuario.component.html',
  styleUrls: ['./modal-edit-usuario.component.css']
})
export class ModalEditUsuarioComponent implements OnInit {

  newData = {
    email: this.data.email,
    data : {}
  };

  client_name : string = "";
  client_last : string = "";
  client_pass : string = "";
  client_conf : string = "";
  client_tele : string = "";

  publisher_name : string = "";
  publisher_pass : string = "";
  publisher_conf : string = "";
  publisher_addr : string = "";

  constructor(
    private userService: UsersService,
    private snackbar: MatSnackBar,
    public dialogo: MatDialogRef<ModalEditUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if( !data.userType ){
        //ES USUARIO
        this.client_name = data.name;
        this.client_last = data.lastName;
        this.client_pass = data.password;
        this.client_tele = data.telephone;
      } else {
        //ES EDITORIAL
        this.publisher_name = data.name;
        this.publisher_pass = data.password;
        this.publisher_addr = data.address;
      }
    }

    cerrarDialogo(): void {
      this.dialogo.close({confirmation: false, data : null});
    }
    confirmado(): void {
      if ( !this.data.userType ){
        //ES USUARIO
        if (this.client_name == '' || this.client_last == '' || this.client_pass == '' || this.client_conf == '' || this.client_tele == '') {
          this.snackbar.open("No puede dejar campos en blanco", 'Aceptar', {
            duration: 2000
          })
        }
        else if (this.client_pass != this.client_conf) {
          this.snackbar.open("La contraseñas no coinciden", 'Aceptar', {
            duration: 2000
          })
        }
        else {
          this.newData.data = {
            name: this.client_name,
            lastName: this.client_last,
            password: this.client_pass,
            telephone: this.client_tele
          }
          this.dialogo.close({confirmation: true, data : this.newData});
        }
      } else {
        //ES EDITORIAL
        if ( this.publisher_name == '' || this.publisher_pass == '' || this.publisher_conf == '' || this.publisher_addr == '' ){
          this.snackbar.open("No puede dejar campos en blanco", 'Aceptar', {
            duration: 2000
          })
        } 
        else if (this.publisher_pass != this.publisher_conf) {
          this.snackbar.open("La contraseñas no coinciden", 'Aceptar', {
            duration: 2000
          })
        }
        else {
          this.newData.data = {
            name: this.publisher_name,
            password: this.publisher_pass,
            address: this.publisher_addr
          }
          this.dialogo.close({confirmation: true, data : this.newData});
        }
      }
    }

  ngOnInit(): void {
  }


}
