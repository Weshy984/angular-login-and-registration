import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  public registration !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      Fname:['', Validators.required],
      Contact:[''],
      email:['',Validators.required],
      password:['', Validators.required],
    })
  }

  registerUser() {
    this.http.post<any>("http://localhost:3000/registerusers",this.registration.value)
    .subscribe(res=>{
      alert("User added succesfully");
      this.registration.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Registration failed");
    })
  }

}
