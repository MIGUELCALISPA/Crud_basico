import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    };
  }

  constructor( public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form: NgForm) {

     console.log (form);
     
     if (form.value.EmployeeID == null) {

      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          // this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        });

    } else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        // this.toastr.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }

}
