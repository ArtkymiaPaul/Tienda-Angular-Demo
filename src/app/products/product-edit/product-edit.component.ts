import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ta-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {


  id:string;
  product: Product;

  constructor(private route: ActivatedRoute, private service: ProductsService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //GET /products/:id
    this.service.get(this.id)
    .pipe(
      catchError(error =>{
        this.snackBar.open('No se puede obtener el producto en este momento', null, {
          duration:3000
        })
        return EMPTY;
      })
    )
    .subscribe(product => {
      console.log('product', product);
      //this.form.setValue(product);
      //this.form.patchValue(product);
      this.product = product;
    })
  }

  submit(product:Product){
      product.id = this.id;
      console.log('going to update', product);
      this.service.update(product)
      .subscribe(result => {
        console.log('Update finished',product)
        this.router.navigate(['/products']);
        this.snackBar.open('El producto ha sido actualizado', 'Cerrar',{
          duration:3000
        });
      });
  }

  cancel(){
    this.router.navigate(['/products']);
  }

}
