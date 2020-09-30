import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ta-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products:Product[];

  constructor(private service:ProductsService,
    private snackBar:MatSnackBar,
    private dialog: MatDialog) { }

  url:string;
  ngOnInit(): void {
    this.loadProducts();
  }

  deleteProduct(product: Product){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth:'600px',
      data: <ConfirmDialogModel>{
        title: 'Borrar Producto',
        message: 'Estas seguro de borrar este producto'
      }
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if(result){
       this.sendDeleteRequest(product); 
      }
    });

    
  }

  private sendDeleteRequest(product: Product){
    this.service.delete(product.id)
    .subscribe(response => {
      console.log('Product has been deleted', response);
      this.loadProducts();
      this.snackBar.open('El producto ha sido eliminado', 'Cerrar',{
        duration:3000
      });
    });
  }

  private loadProducts(){
    this.service.getAll()
    .pipe(
      catchError(error => {
        this.snackBar.open('No se pudieron obtener los productos en este momento, intente mas adelante', null,{
          duration: 3000
        });
        return EMPTY;
      })
    )
    .subscribe(data => {
      console.log('data',data);
      this.products = data;
    });
  }
}
