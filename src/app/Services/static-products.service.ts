import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class StaticProductsService {
  private prdList: IProduct[];
  constructor() {
     this.prdList = [
      // { id: 100, name: 'Lenovo Think Pad', price: 1000434, quantity: 2, imgURL: 'https://fakeimg.pl/100/', categoryID: 1, categoryName: 'Laptops' },
      // { id: 200, name: 'Tablet S1', price: 2034430, quantity: 3, imgURL: 'https://fakeimg.pl/100/', categoryID: 2, categoryName: 'Tablets' },
      // { id: 800, name: 'Tablet S2', price: 2847500, quantity: 3, imgURL: 'https://fakeimg.pl/100/', categoryID: 2, categoryName: 'Tablets' },
      // { id: 400, name: 'MacBook Pro', price: 340, quantity: 0, imgURL: 'https://fakeimg.pl/100/', categoryID: 1, categoryName: 'Laptops' },
      // { id: 500, name: 'iPhone 13', price: 4094, quantity: 2, imgURL: 'https://fakeimg.pl/100/', categoryID: 3, categoryName: 'Mobiles' },
      // { id: 600, name: 'iPhone 12', price: 504820, quantity: 1, imgURL: 'https://fakeimg.pl/100/', categoryID: 3, categoryName: 'Mobiles' },
    ];
  }

  getAllProducts(): IProduct[] {
    return this.prdList;
  }
  // getProductsByCatID(cID: number): IProduct[] {
  //   if (cID == 0)
  //     return this.prdList
  //   else
  //     return this.prdList.filter(prd => prd.categoryID == cID)
  // }

  getProductsByCatID(catName: string): IProduct[] {
    console.log("Here");
    
    if (catName == "")
      return this.prdList
    else
      return this.prdList.filter(prd => prd.category == catName)
  }
  

  getProductByCatID(pID: number): IProduct | null {
    let foundProduct = this.prdList.find(prd => prd.id == pID);
    return foundProduct ? foundProduct : null;
  }

  addNewProduct(prd: IProduct) {
    this.prdList.push(prd)
  }

}
