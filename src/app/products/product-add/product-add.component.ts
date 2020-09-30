import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ta-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {


  constructor( private service: ProductsService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit(product: Product){
      console.log('Going to save', product);
      this.service.add(product)
      .pipe(
        catchError(error =>{
          this.snackBar.open(error, null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(result => {
        console.log('The product has been added');
        this.router.navigate(['']);
        //mensaje de confirmacion
        this.snackBar.open('Un nuevo producto ha sido anadido', 'Cerrar',{
          duration: 3000
        });
      });
  }

  cancel(){
    this.router.navigate(['']);
  }

}
