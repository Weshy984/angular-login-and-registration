import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InventorydialogComponent } from '../inventorydialog/inventorydialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['prodName', 'prodcategory', 'date', 'prodstate', 'price', 'description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api:ApiService) { }

  ngOnInit(): void {
    this.viewItems(); 
    
  }
  

  openinventoryDialog(){
    this.dialog.open(InventorydialogComponent,{
      width:'30%'
    })
  }
  editItem(row:any){
    this.dialog.open(InventorydialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'updated'){
        this.viewItems();
      }
    })
  }
  deleteItem(id: number){
    this.api.deleteInventory(id)
    .subscribe({
      next:(res)=>{
        alert("Item removed");
        this.viewItems();
      },
      error:(err)=>{
        alert("problem deleting");
      }
    })
  }
  viewItems(){
    this.api.getInventory()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.sort
      },
      error:(err)=>{
        alert("Problem fetching items");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
