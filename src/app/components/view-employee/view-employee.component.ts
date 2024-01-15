import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  search:string = '';
  page: number = 1;
  pageSize: number = 5;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.GetAllEmployees();
  }

  GetAllEmployees() {
    this.employeeService.GetAllEmployees().subscribe((res) => {
      if (res.success) {
        this.employeeList = res.data!;
      }
    });
  }

  GetEmployeeByDocumentOrName() {
    if(!this.search){
      this.GetAllEmployees();
      return;
    }
    this.employeeService.GetEmployeeByDocumentOrName(this.search).subscribe((res) => {
      if (res.success) {
        this.employeeList = res.data!;
      }
    });
  }
}
