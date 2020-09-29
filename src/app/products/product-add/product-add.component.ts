import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ta-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    salePrice: new FormControl(''),
    thumbImage: new FormControl(''),
  });
  constructor( private service: ProductsService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.valid){
      const product = this.form.value; //Product
      console.log('Going to save', product);
      this.service.add(product)
      .subscribe(result => {
        console.log('The product has been added');
        this.router.navigate(['']);
        //mensaje de confirmacion
        this.snackBar.open('Un nuevo producto ha sido anadido', 'Cerrar',{
          duration: 3000
        });
      });
    }else{
      console.log('form is invalid');
    }
  }

  cancel(){
    this.router.navigate(['']);
  }

}
