import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'ta-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products:Product[];

  constructor(private service:ProductsService) { }

  url:string;
  ngOnInit(): void {
    this.service.getAll()
    .subscribe(data => {
      console.log('data',data);
      this.products = data;
    });
  }

}
