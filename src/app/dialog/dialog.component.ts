import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  actionBtn: string = "save";
  employeeForm !: FormGroup 
 

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      empName: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      pay: ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn= "Update"
      this.employeeForm.controls['empName'].setValue(this.editData.empName);
      this.employeeForm.controls['contact'].setValue(this.editData.contact);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['address'].setValue(this.editData.address);
      this.employeeForm.controls['pay'].setValue(this.editData.pay);
    }
  }

  addEmployee(){
    if(this.editData){
      this.updateEmployee();
    }else{
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Added employee successfully");
            this.employeeForm.reset();
            this.dialogRef.close("Emp saved");
          },
          error:(err)=>{
            alert("Problem adding employee");
          }
        })
      }
    }
  }

  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Updated employee");
        this.employeeForm.reset();
        this.dialogRef.close('emp Updated');
      },
      error:(err)=>{
        alert("Error while updating");
      }
    })
  }

}
