import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  prdListOfCat?: IProduct[] = [];
  orderTotalPrice: number = 0;
  constructor(private prdService: ProductsService, private location: Location) {
  }

  ngOnInit(): void {
    this.prdService.getCartListObservable().subscribe((dataList) => {
      this.prdListOfCat = dataList;
      console.log(this.prdListOfCat);
    });
  }

  buy(prdID: any = 0, count: any) {
    this.orderTotalPrice += +count * prdID
  }

  goBack() {
    this.location.back();
  }
}
