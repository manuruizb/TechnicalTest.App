import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'employees',
    component: EmployeePageComponent,
  },
  {
    path:'create-employee',
    component: CreateEmployeeComponent,
  },
  {
    path:'update-employee/:documentNumber',
    component: CreateEmployeeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
