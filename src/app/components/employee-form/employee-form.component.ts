import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentTypes } from '../../models/document-types';
import { Countries } from '../../models/countries';
import { CountryService } from '../../services/country.service';
import { Areas } from '../../models/areas';
import { AreaService } from '../../services/area.service';
import { SubAreas } from '../../models/sub-areas';
import { SubAreaService } from '../../services/sub-area.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
    names: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    documentTypeId: new FormControl('', Validators.required),
    countryId: new FormControl('', Validators.required),
    areaId: new FormControl('', Validators.required),
    subAreaId: new FormControl('', Validators.required),
    createdDateString: new FormControl('', Validators.required)
  })
  documentTypeList: DocumentTypes[] = [];
  countryList: Countries[] = [];
  areaList: Areas[] = [];
  subAreaList: SubAreas[] = [];
  isUpdate: boolean = false;
  employeeId: string = '';

  constructor(
    private documentTypeService: DocumentTypeService,
    private countryService: CountryService,
    private areaService: AreaService,
    private subAreaService: SubAreaService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const documentNumber = params.get('documentNumber')
      if (documentNumber) {
        this.isUpdate = true;
        this.GetEmployeeByDocumentOrName(documentNumber);
      }
    });
    this.GetAllDocuments();
    this.GetAllCountries();
  }

  CreateEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    const employee = this.employeeForm.getRawValue() as Employee;
    if (this.isUpdate) {
      employee.employeeId = this.employeeId;
      this.employeeService.UpdateEmployee(employee).subscribe(res => {
        if (res.success) {
          Dialog.show('Empleado actualizado', Dialogtype.success)
        }
      })
    } else {
      this.employeeService.CreateEmployee(employee).subscribe(res => {
        if (res.success) {
          Dialog.show('Empleado guardado', Dialogtype.success)
          this.ClearForm();
        }
      })
    }

  }

  GetAllDocuments() {
    this.documentTypeService.GetAllDocuments().subscribe(res => {
      if (res.success) {
        this.documentTypeList = res.data!;
      }
    });
  }

  GetAllCountries() {
    this.countryService.GetAllCountries().subscribe(res => {
      if (res.success) {
        this.countryList = res.data!;
      }
    });
  }

  GetAreasByCountry(evt: Event) {
    const element = evt.target as HTMLSelectElement;
    const countryId = element.value;

    this.employeeForm.get('areaId')?.setValue('');
    this.employeeForm.get('subAreaId')?.setValue('');
    this.areaList = [];
    this.subAreaList = [];

    this.GetAreasByCountryData(countryId);
  }

  GetAreasByCountryData(countryId: string) {
    this.areaService.GetAreasByCountry(countryId).subscribe(res => {
      if (res.success) {
        this.areaList = res.data!;
      }
    });
  }

  GetSubAreasByArea(evt: Event) {
    const element = evt.target as HTMLSelectElement;
    const areaId = element.value;

    this.employeeForm.get('subAreaId')?.setValue('');
    this.subAreaList = [];

    this.GetSubAreasByAreaData(areaId)
  }

  GetSubAreasByAreaData(areaId: string) {
    this.subAreaService.GetSubAreasByArea(areaId).subscribe(res => {
      if (res.success) {
        this.subAreaList = res.data!;
      }
    });
  }

  ClearForm() {
    this.employeeForm.patchValue({
      names: '',
      lastName: '',
      documentNumber: '',
      documentTypeId: '',
      countryId: '',
      areaId: '',
      subAreaId: '',
      createdDateString: ''
    })
  }

  GetEmployeeByDocumentOrName(documentNumber: string) {
    this.employeeService.GetEmployeeByDocumentOrName(documentNumber).subscribe((res) => {
      if (res.success) {
        const employee = res.data![0];
        const createdDate = new Date(employee.createdDate);

        var year = createdDate.getFullYear();

        var month = (createdDate.getMonth() + 1).toString().padStart(2, '0');

        var day = createdDate.getDate().toString().padStart(2, '0');

        var formattedDate = year + '-' + month + '-' + day;

        this.employeeForm.patchValue({
          names: employee.names,
          lastName: employee.lastName,
          documentNumber: employee.documentNumber,
          documentTypeId: employee.documentTypeId,
          countryId: employee.countryId,
          areaId: employee.areaId,
          subAreaId: employee.subAreaId,
          createdDateString: formattedDate
        })

        this.GetAreasByCountryData(employee.countryId);
        this.GetSubAreasByAreaData(employee.areaId);

        this.employeeId = employee.employeeId;
      }
    });
  }
}
