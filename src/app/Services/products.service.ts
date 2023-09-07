import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOption;
  // newProductAdded: BehaviorSubject<IProduct[]>;
  public data: BehaviorSubject<IProduct[]>;
  private dataList: IProduct[] = []
  private categoryList: ICategory[] = []
  productsInCart: any[] = [];
  // private dataListSubject = new Subject<IProduct[]>();
  private dataListSubject = new BehaviorSubject<any[]>([]);
  private categoryListSubject = new BehaviorSubject<any[]>([]);
  private cartListSubject = new BehaviorSubject<IProduct[]>([]);


  httpMethod: string = 'GET'
  constructor(private httpClient: HttpClient,
    private spinner: NgxSpinnerService) {
    this.fetchDataFromAPI();
    this.fetchCategoriesFromAPI();
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    this.data = new BehaviorSubject<IProduct[]>([]);
  }

  fetchDataFromAPI() {
    this.httpClient.get<IProduct[]>(`${environment.APIURL}/products`).subscribe((data) => {
      this.dataList = data;
      this.dataListSubject.next([...this.dataList]);
    });
  }

  fetchCategoriesFromAPI() {
    this.httpClient.get<ICategory[]>(`${environment.APIURL}/products/categories`).subscribe((data) => {
      this.categoryList = data;
      this.categoryListSubject.next([...this.categoryList]);
    });
  }

  // getAllProducts(): Observable<IProduct[]> {
  //   return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products`)
  // }

  // getAllCategories(): Observable<ICategory[]> {
  //   return this.httpClient.get<ICategory[]>(`${environment.APIURL}/products/categories`)
  // }

  getDataListObservable(): Observable<any[]> {
    return this.dataListSubject.asObservable();
  }

  getCategoryListObservable(): Observable<any[]> {
    return this.categoryListSubject.asObservable();
  }

  getCartListObservable(): Observable<any[]> {
    return this.cartListSubject.asObservable();
  }

  addItem(item: any) {
    const currentDataList = this.dataListSubject.value;
    console.log(currentDataList);
    const updatedDataList = [...currentDataList, item]
    console.log(updatedDataList);
    this.dataListSubject.next(updatedDataList);
  }



  updateItem(updatedItem: IProduct) {
    const currentDataList = this.dataListSubject.value;
    const updatedDataList = currentDataList.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.dataListSubject.next(updatedDataList);
  }

  getItemById(id: number): IProduct | null {
    const currentDataList = this.dataListSubject.value;
    const foundItem = currentDataList.find((item) => item.id === id);
    return foundItem;
  }

  addToCart(id: number) {
    const currentDataList = this.dataListSubject.value;
    const foundItem = currentDataList.find((item) => item.id === id);
    if (foundItem) {
      if (this.productsInCart?.find((item) => item.id === id)) {
        alert('Already added')
      } else {
        this.productsInCart?.push(foundItem)
        this.cartListSubject.next([...this.productsInCart]);
        // localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart2));
      }
      console.log(this.cartListSubject.value);
      // arr2.push(arr)
      // localStorage.setItem('productsInCart', JSON.stringify(arr2));
    }
    // return foundItem; 
  }

  // getProductByID(prdID: number): Observable<IProduct> {
  //   return this.httpClient.get<IProduct>(`${environment.APIURL}/products/${prdID}`)
  // }

  filterProductsByCategoryName(categoryName: string) {
    console.log("categoryName");
    console.log(categoryName);
    const currentDataList = this.dataListSubject.value;
    console.log("Here in filterProductsByCategoryName");
    console.log(currentDataList);
    const foundProducts = currentDataList.filter((item) => item.category === categoryName);
    console.log(foundProducts);
    return foundProducts
  }

  deleteItem(prdID: number) {
    console.log("From Service");
    console.log(prdID);
    const currentDataList = this.dataListSubject.value;
    console.log(currentDataList);
    const filtered = currentDataList.filter(item => item.id !== prdID);
    console.log(filtered);
    this.dataListSubject.next(filtered);
    console.log(this.dataListSubject);
  }

  
  

  // getProductsByCatID(catName: string): Observable<IProduct[]> {
  //   return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products/category/${catName}`)
  // }

  // addProduct(newPrd: IProduct[]): Observable<IProduct[]> {
  //   this.data.next(newPrd)
  //   this.httpMethod = 'Add'
  //   return this.httpClient.post<IProduct[]>(`${environment.APIURL}/products`, JSON.stringify(newPrd), this.httpOption);
  // }

  // updateProduct(prdID: number, newPrd: IProduct): Observable<IProduct> {
  //   return this.httpClient.put<IProduct>(`${environment.APIURL}/products/${prdID}`, JSON.stringify(newPrd))
  // }

  // deleteProduct(prdID: number) { }
}
