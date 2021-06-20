import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; 
import { AdminComponent } from './principal/admin/admin.component';
import { EditorialComponent } from './principal/editorial/editorial.component';
import { ClienteComponent } from './principal/cliente/cliente.component';

import { ConfirmarEditorialComponent } from './principal/admin/confirmar-editorial/confirmar-editorial.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';

import { AdminLibrosComponent } from './principal/editorial/admin-libros/admin-libros.component';
import { CatalogoLibrosComponent } from './principal/catalogo-libros/catalogo-libros.component';
import { DetalleLibroComponent } from './principal/detalle-libro/detalle-libro.component';
import { AdminUsuariosComponent } from './principal/admin/admin-usuarios/admin-usuarios.component';
import { ModalEditUsuarioComponent } from './principal/admin/admin-usuarios/modal-edit-usuario/modal-edit-usuario.component';
import { DialogoCantidadComponent } from './dialogo-cantidad/dialogo-cantidad.component';
import { CheckoutComponent } from './principal/checkout/checkout.component';
import { PerfilClienteComponent } from './principal/perfil-cliente/perfil-cliente.component';
import { PerfilEditorialComponent } from './principal/perfil-editorial/perfil-editorial.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    AdminComponent,
    EditorialComponent,
    ClienteComponent,
    ConfirmarEditorialComponent,
    DialogoConfirmacionComponent,
    AdminLibrosComponent,
    CatalogoLibrosComponent,
    DetalleLibroComponent,
    AdminUsuariosComponent,
    ModalEditUsuarioComponent,
    DialogoCantidadComponent,
    CheckoutComponent,
    PerfilClienteComponent,
    PerfilEditorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
