import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  public registration !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  getErrorMessage() {
    if (this.email.hasError('required') && this.email.value.empty) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      Fname:['', Validators.required],
      Contact:[''],
      email:['',Validators.required],
      password:['', Validators.required],
    })
  }

  registerUser() {
    if (this.registration.value!=null){
    this.http.post<any>("http://localhost:3000/registerusers",this.registration.value)
    .subscribe({
      next:(res)=>{
      alert("User added succesfully");
      console.log(this.registration);
      this.registration.reset();
      this.router.navigate(['login']); 
      },
      error:()=>{
        alert("Registration failed");
      }
    })
    }
  }

}
