import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';
import { AddProductComponent } from '../../add-product/add-product.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges, OnInit, AfterViewInit {
  
  productsList: IProduct[] = [];
  paginationFlag: string = 'ProductListComponent';
  @Input() sentCatName: string = "";
  @Output() totalPriceChanged: EventEmitter<number>;
  orderTotalPrice: number = 0;
  loggedUser: boolean = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private prdService: ProductsService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    
    private router: Router) {
    const userData = JSON.parse(localStorage.getItem('userCredentials')!);
    let username = userData.username;
    if (username === 'user') {
      this.loggedUser = false
    }
    this.totalPriceChanged = new EventEmitter<number>();
  }

  ngAfterViewInit(): void {
  }

  onTableDataChange(event: any) {
    this.page = event;
    if (this.paginationFlag === 'ProductListComponent') {
      this.fetchProducts();
    } else {
      this.prdService.filterProductsByCategoryName(this.sentCatName);
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    if (this.paginationFlag === 'ProductListComponent') {
      this.fetchProducts();
    } else {
      this.prdService.filterProductsByCategoryName(this.sentCatName);
    }
  }
  fetchProducts(): void {
    // this.spinner.show();
    this.prdService.getDataListObservable().subscribe((dataList) => {
      this.productsList = dataList;
    });

  }

  ngOnInit(): void {
    this.fetchProducts();
    // if('updatedProducts' in localStorage){
    //   this.prdListOfCat = JSON.parse(localStorage.getItem("updatedProducts")!);
    // }else{
    //   if (getstatus == 'GET') {
    //     this.prdService.getAllProducts().subscribe(products => {
    //       this.prdListOfCat = products
    //       // console.log("From Product List");
    //       // console.log(this.prdListOfCat);
    //     })
    //   } else if (getstatus == 'Add') {
    //     this.prdService.data.subscribe(
    //       (products) => {
    //         // console.log(products);
    //         this.prdListOfCat = products
    //       }
    //     );
    //   }
    // }

  }




  ngOnChanges(): void {
    this.spinner.show();
    if (this.sentCatName) {
      this.productsList = this.prdService.filterProductsByCategoryName(this.sentCatName);
    } else {
      this.prdService.getDataListObservable().subscribe((dataList) => {
        this.productsList = dataList;
      });
    }
    this.paginationFlag = 'ProductsByCategory'
    this.page = 1
    console.log("on all");
    this.spinner.hide();
    // console.log("change from ngOnChange");
    // this.filterProductsByCatID();
    //this.prdListOfCat = this.staticPrdService.getProductsByCatID(this.sentCatName);
    // this.prdService.getProductsByCatID(this.sentCatName).subscribe(products => {
    //   let getstatus = this.prdService.httpMethod
    //   if (getstatus == 'GET') {
    //     this.prdListOfCat = products
    //   } else if (getstatus == 'Add') {
    //     if (this.prdListOfCat == null) {
    //       let newDataFound;
    //       this.prdService.data.subscribe(
    //         (products) => {
    //           newDataFound = products
    //           if (newDataFound) {
    //             this.prdListOfCat = products
    //           }
    //         }
    //       );
    //     }
    //   }
    // })
  }

  buy(prdPrice: number, count: any) {
    this.orderTotalPrice += +count * prdPrice;
    this.totalPriceChanged.emit(this.orderTotalPrice);
  }

  openPrdDetails(prdID: number) {
    this.router.navigate(['/Products', prdID]);
  }
  // update(item: any) {
  //   // this.form.get('title')?.setValue
  // }

  deleteProduct(prdID: any = 0) {
    this.spinner.show();
    console.log(prdID);
    this.prdService.deleteItem(prdID);
    this.spinner.hide();
  }

  addToCart(prdID: any) {
    this.spinner.show();
    this.prdService.addToCart(prdID);
    // this.router.navigate(['/Products/Cart']);
    this.spinner.hide();
    // this.prdToCar = prdID
    // this.prd = this.prdService.getItemById(this.prdToCar);
    // const filtered = this.productsInCart?.find((item: any) => item.id === this.prdToCar);
    // console.log(filtered);
    // if(filtered){
    //   alert('Already Added to Cart...')
    //   // this.router.navigate(['/Products/Cart']);
    // }else{
    //   this.productsInCart?.push(this.prd);
    //   this.productsInCart2?.push(this.productsInCart);
    // }
    // localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart2));
    // console.log(this.productsInCart2?.length);
    // this.router.navigate(['/Products/Cart']);
    // if ("productsInCart" in localStorage) {
    //   // let newData = [].concat(productsInCart, this.prd);
    //   // var newData = [...productsInCart, this.prd]
    //   console.log("In If");
    // const filtered = productsInCart.filter((item: any) => item.id !== this.prdToCar);
    // // console.log(filtered);
    // if (filtered) {
    //   productsInCart2.push(productsInCart)
    //   localStorage.setItem('productsInCart', JSON.stringify(productsInCart2));
    // } else {
    //   localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart2));
    // }
  }


}
