import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente : any;

  constructor(
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
  ) {
    let token = new String(sessionStorage.getItem('jwToken'));
    
    this.userService.decodeToken(token)
      .subscribe(data => {
        console.log(data)
        this.cliente = data;

        if (this.cliente.type != 'cliente')
        {
          this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
            duration: 1500
          });
          this.router.navigate(['login']);
        }
      }, error => {
        this.snackbar.open("No tiene permisos para acceder a la URL especificada", 'Aceptar', {
          duration: 1500
        });
        this.router.navigate(['login']);
      })
  }

  ngOnInit(): void { }

}
