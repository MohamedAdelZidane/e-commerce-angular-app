import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss']
})
export class OrderMasterComponent implements OnInit, OnChanges {
  
  listOfCategories: ICategory[] = [];
  listOfProducts: ICategory[] = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  // selectedCatID: number=0;
  //TBR
  selectedCatName: string = "";
  recievedOrderTotalPrice: number = 0;
  @ViewChild('clientNameInp') clientNameInpElem!: ElementRef; //Non-null assertion operator
  @ViewChild(ProductListComponent) prdListCompObj!: ProductListComponent;

  constructor(private prdService: ProductsService) { }
  ngOnChanges(changes: SimpleChanges): void {

  }
  
  ngOnInit(): void {
    this.prdService.getCategoryListObservable().subscribe(categories => {
      this.listOfCategories = categories
    })
    this.prdService.getDataListObservable().subscribe((dataList) => {
      this.listOfProducts = dataList;
    });
  }

  onTotalPriceChanged(totalPrice: number) {
    this.recievedOrderTotalPrice = totalPrice;
    // this.prdListClistOfProductsompObj.prdList[0].quantity -= 1
  }

  completeOrder() {
    //this.prdListCompObj.prdList[0].quantity -= 1
  }

}
