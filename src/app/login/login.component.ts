import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public logForm !: FormGroup;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.logForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login(){

    this.http.get<any>("http://localhost:3000/registerusers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email == this.logForm.value.email && a.password === this.logForm.value.password
        
      });
      if(user){
        alert("Login successful");
        this.logForm.reset();
        this.router.navigate(['employeeDash'])
        
      }else{
        alert("User not found");
        console.log('user not there');
        this.router.navigate(['registration']);
      }
    },err=>{
      alert("Error logging in");
    })

  }

}
