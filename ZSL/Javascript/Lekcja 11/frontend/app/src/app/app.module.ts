import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {NoCommaPipe} from './noCommaPipe';
import { InputFormComponent } from './input-form/input-form.component';
import { MagazinesComponent } from './magazines/magazines.component';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { YearsFormComponent } from './years-form/years-form.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MagazinesAddFormComponent } from './magazines-add-form/magazines-add-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MagazinesEditFormComponent } from './magazines-edit-form/magazines-edit-form.component';
// import { CorsInterceptor } from './cors.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NoCommaPipe,
    InputFormComponent,
    MagazinesComponent,
    ClockComponent,
    YearsFormComponent,
    MagazinesAddFormComponent,
    MagazinesEditFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [
    MatTableDataSource,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
