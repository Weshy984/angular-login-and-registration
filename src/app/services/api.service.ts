import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //postUser(data:any){
    //this.http.post<any>("http://localhost:3000/registerusers",data);
  //}
  //getUser(data:any){
    //this.http.get<any>("http://localhost:3000/registerusers",data);
    
  //}
  //inventory api
  postInventory(data:any){
    return this.http.post<any>("http://localhost:3000/inventory/",data);
    
  }
  getInventory(){
    return this.http.get<any>("http://localhost:3000/inventory/");
    
  }
  putInventory(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/inventory/"+id, data);
  }
  deleteInventory(id: number){
    return this.http.delete<any>("http://localhost:3000/inventory/"+id);
    
  }

  //employees api
  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/employees/",data);
    
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employees/");
    
  }
  putEmployee(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/employees/"+id, data);
  }
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/employees/"+id);
    
  }
}
