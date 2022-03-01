import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-inventorydialog',
  templateUrl: './inventorydialog.component.html',
  styleUrls: ['./inventorydialog.component.css']
 
})
export class InventorydialogComponent implements OnInit {
 
  category: string[] = [
    'Fruits',
    'Electronics',
    'Vegetables',
    'Tools',
    'Furniture',
    'Clothes',
  ];

  states: string[] = [
    'new',
    'refubrished',
    'fresh',
    'spoilt'
  ]

  inventoryForm !: FormGroup
  actionBtn: string = "save";
   
  constructor(private formBuilder: FormBuilder, private api:ApiService, private dialogRef:MatDialogRef<InventorydialogComponent>, @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.inventoryForm = this.formBuilder.group({
      prodName : ['',Validators.required],
      prodcategory: ['', Validators.required],
      date: ['', Validators.required],
      prodstate: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    })
    
    if(this.editData){
      this.actionBtn = "Update"
      this.inventoryForm.controls['prodName'].setValue(this.editData.prodName);
      this.inventoryForm.controls['prodcategory'].setValue(this.editData.prodcategory);
      this.inventoryForm.controls['date'].setValue(this.editData.date);
      this.inventoryForm.controls['prodstate'].setValue(this.editData.prodstate);
      this.inventoryForm.controls['price'].setValue(this.editData.price);
      this.inventoryForm.controls['description'].setValue(this.editData.description);
    }
  }

  addInventory(){
    
    if(this.editData){
      this.updateItem();
      }else{
        if(this.inventoryForm.valid) {
          this.api.postInventory(this.inventoryForm.value)
          .subscribe({
            next:(res)=>{
              alert("Item successfuly added");
              this.inventoryForm.reset();
              this.dialogRef.close("saved");
              //this.viewItems();
            },
            error:()=>{
              alert("problem adding item");
            }
          })
        }
      }
  }

  updateItem(){
    this.api.putInventory(this.inventoryForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Update was successful");
        this.inventoryForm.reset();
        this.dialogRef.close('updated');
      },
      error:(err)=>{
        alert("Error updating item");
      }
    })
  }
  //viewItems(){
    //this.api.getInventory()
  //}

}
