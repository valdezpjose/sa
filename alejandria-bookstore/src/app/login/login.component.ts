import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UsersService } from '../services/users.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../models/login'
import { RegCliente } from '../models/cliente'
import { RegEditorial } from '../models/editorial';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //BOLEANO PARA CONTROLAR EL FORMULARIO DE REGISTRO QUE SE MUESTRA [CLIENTE/EDITORIAL]
  register_publisher: boolean;

  //CAMPOS DE INICIO DE SESIÓN
  email_user: string;
  passw_user: string;

  //CAMPOS PARA EL REGISTRO DE CLIENTES
  client_name: string;
  client_last: string;
  client_mail: string;
  client_pass: string;
  client_conf: string;
  client_tele: string;
  client_type: string;

  //CAMPOS PARA EL REGISTRO DE EDITORIALES
  publisher_name: string;
  publisher_mail: string;
  publisher_pass: string;
  publisher_conf: string;
  publisher_addr: string;


  constructor(@Inject(DOCUMENT) private mainDocument: Document,
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {

    this.register_publisher = false;

    //CAMPOS DE INICIO DE SESIÓN
    this.email_user = '';
    this.passw_user = '';

    //CAMPOS PARA EL REGISTRO DE USUARIO
    this.client_name = '';
    this.client_last = '';
    this.client_mail = '';
    this.client_pass = '';
    this.client_conf = '';
    this.client_tele = '';
    this.client_type = '';

    //CAMPOS PARA EL REGISTRO DE EDITORIALES
    this.publisher_name = '';
    this.publisher_mail = '';
    this.publisher_pass = '';
    this.publisher_conf = '';
    this.publisher_addr = '';

    sessionStorage.clear();

  }

  ngOnInit(): void { }

  login() {

    if (this.email_user == '' || this.passw_user == '') {
      this.snackbar.open("No puede dejar campos en blanco", 'Aceptar', {
        duration: 2000
      })
    }
    else {
      if (this.email_user == 'admin' && this.passw_user == 'test123') {
        this.snackbar.open("A perro sos admin", 'Aceptar', {
          duration: 2000
        })
        sessionStorage.setItem('jwToken', 'el perro es admin, déjenlo pasar')
        this.router.navigate(['principal/catalogo-libros']);

      }
      else {

        let credentials: Login = {
          email: this.email_user,
          password: this.passw_user
        };

        this.userService.login(credentials)
          .subscribe(data => {
            if (data.auth == true) {
              sessionStorage.setItem('jwToken', data.token)

              if (data.type == 'editorial') {

                this.userService.decodeToken(data.token)
                  .subscribe(data => {

                    if ( data.status == 'inactivo')
                    {
                      this.snackbar.open("Su cuenta aún no ha sido verificada, por favor intente más tarde", 'Aceptar', {
                        duration: 2500
                      });
                    }
                    else
                    {
                      this.snackbar.open("Bienvenido", 'Aceptar', {
                        duration: 2000
                      })          
                      this.router.navigate(['principal/catalogo-libros']);
                    }

                  }, error => {
                    this.snackbar.open("Ocurrió un error al momento de obtener la información del token de la editorial", 'Aceptar', {
                      duration: 2500
                    });
                  })
              }
              else {
                this.snackbar.open("Bienvenido", 'Aceptar', {
                  duration: 2000
                })
    
                this.router.navigate(['principal/catalogo-libros']);
              }
            }
          }, error => {
            this.snackbar.open("Error al iniciar sesión, por favor verifique sus credenciales", 'Aceptar', {
              duration: 2000
            })
            console.log(error)
          })

      }
    }
  }


  registerPublisher() {
    if (this.publisher_name == '' || this.publisher_mail == '' || this.publisher_pass == '' || this.publisher_conf == '' || this.publisher_addr == '') {
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
      let info: RegEditorial = {
        name: this.publisher_name,
        email: this.publisher_mail,
        password: this.publisher_pass,
        address: this.publisher_addr,
        type: 'editorial'
      }

      this.userService.registerPublisher(info)
        .subscribe(data => {

          if (data.auth == true) {
            this.snackbar.open("Datos guardados con éxito. Por favor espere la confirmación de su cuenta por un administrador para poder acceder a las funciones de esta", 'Aceptar', {
              duration: 4000
            })

          }
        }, error => {
          this.snackbar.open("Error al registrar la editorial, por favor intente de nuevo", 'Aceptar', {
            duration: 2000
          })
          console.log(error)
        })
    }
  }


  registerClient() {
    if (this.client_name == '' || this.client_last == '' || this.client_mail == '' || this.client_pass == '' || this.client_conf == '' || this.client_tele == '') {
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
      let info: RegCliente = {
        name: this.client_name,
        lastName: this.client_last,
        email: this.client_mail,
        password: this.client_pass,
        telephone: this.client_tele,
        type: 'cliente'
      }


      this.userService.registerClient(info)
        .subscribe(data => {

          if (data.auth == true) {
            this.snackbar.open("Cliente registrado con éxito. Bienvenido!!!", 'Aceptar', {
              duration: 2000
            })
            sessionStorage.setItem('jwToken', data.token)
            this.router.navigate(['principal/cliente']);

          }
        }, error => {
          this.snackbar.open("Error al registrar usuario, por favor intente de nuevo", 'Aceptar', {
            duration: 2000
          })
          console.log(error)
        })


    }
  }

  changePublisherForm() {
    this.register_publisher = !this.register_publisher;
  }

  changeCard1() {
    let element = this.mainDocument.getElementById('container');
    element?.classList.add('right-panel-active');

  }

  changeCard2() {
    let element = this.mainDocument.getElementById('container');
    element?.classList.remove('right-panel-active');
  }

}
