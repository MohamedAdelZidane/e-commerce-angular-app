import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  currPrdID: number = 0;
  prd: IProduct | null = null;
  //read about activated route
  constructor(private activatedRoute: ActivatedRoute,
    // private staticPrdService: StaticProductsService,
    private prdService: ProductsService,
    //read about object history in JS
    private location: Location) {

  }
  ngOnInit(): void {
    this.currPrdID = Number(this.activatedRoute.snapshot.paramMap.get('pid'))
    // let getstatus = this.prdService.httpMethod
    this.prd = this.prdService.getItemById(this.currPrdID);
  }

  goBack() {
    this.location.back();
  }

}
