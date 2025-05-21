import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component'
import { MagazinesComponent} from './magazines/magazines.component'
import { YearsFormComponent } from './years-form/years-form.component';
import { MagazinesAddFormComponent } from './magazines-add-form/magazines-add-form.component';
import { MagazinesEditFormComponent } from './magazines-edit-form/magazines-edit-form.component';
const routes: Routes = [
  {path: '', redirectTo:"input", pathMatch: "full"},
  {path: 'input', component: InputFormComponent },
  {path: 'magazine', component: MagazinesComponent },
  {path: 'magazine/:id', component: YearsFormComponent },
  {path: 'magazine/:id/:year', component: YearsFormComponent },
  {path: 'addmagazine', component: MagazinesAddFormComponent },
  {path: 'editmagazine', component: MagazinesEditFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
