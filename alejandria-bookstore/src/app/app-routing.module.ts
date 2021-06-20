import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './principal/admin/admin.component';
import { EditorialComponent } from './principal/editorial/editorial.component';
import { ClienteComponent } from './principal/cliente/cliente.component';

import { AdminLibrosComponent } from './principal/editorial/admin-libros/admin-libros.component';

import { ConfirmarEditorialComponent } from './principal/admin/confirmar-editorial/confirmar-editorial.component';
import { CatalogoLibrosComponent } from './principal/catalogo-libros/catalogo-libros.component';
import { DetalleLibroComponent } from './principal/detalle-libro/detalle-libro.component';
import { AdminUsuariosComponent } from './principal/admin/admin-usuarios/admin-usuarios.component';
import { CheckoutComponent } from './principal/checkout/checkout.component';
import { PerfilClienteComponent } from './principal/perfil-cliente/perfil-cliente.component';
import { PerfilEditorialComponent } from './principal/perfil-editorial/perfil-editorial.component';

const routes: Routes = [
  {
    path: 'principal', component: PrincipalComponent,
    children : [
      {
        path: 'catalogo-libros', component: CatalogoLibrosComponent
      },
      {
        path: 'detalle-libro/:nombre/:editorial', component: DetalleLibroComponent
      },
      {
        path: 'checkout', component: CheckoutComponent
      },
      {
        path: 'cliente', component: ClienteComponent
      },
      {
        path: 'perfil-cliente', component: PerfilClienteComponent
      },
      {
        path: 'perfil-editorial', component: PerfilEditorialComponent
      },
      {
        path: 'editorial', component: EditorialComponent,
        children : [
          {
            path : 'admin-libros', component : AdminLibrosComponent
          }
        ]
      },
      {
        path: 'admin', component: AdminComponent,
        children : [
          {
            path : 'confirmar-solicitud', component : ConfirmarEditorialComponent
          },
          {
            path : 'admin-usuarios', component : AdminUsuariosComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: '/principal/catalogo-libros', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
