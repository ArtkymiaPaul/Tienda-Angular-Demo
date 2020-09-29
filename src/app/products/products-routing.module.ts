import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '', // /products
    component: ProductsComponent,
    children:[
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path:'list', //products/list
        component: ProductListComponent
      },
      {
        path:'add', //products/add
        component: ProductAddComponent
      },
      {
        path:'edit/:id', //products/edit/id
        component: ProductEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
