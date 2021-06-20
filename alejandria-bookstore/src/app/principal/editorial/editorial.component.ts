import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  editorial : any;

  constructor(
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
  ) {

    let token = new String(sessionStorage.getItem('jwToken'));

    this.userService.decodeToken(token)
      .subscribe(data => {

        this.editorial = data;

        if (this.editorial.type != 'editorial' || this.editorial.status != 'activo')
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

  ngOnInit(): void {
  }

}
