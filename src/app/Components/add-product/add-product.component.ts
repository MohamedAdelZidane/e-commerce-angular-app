import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnChanges, OnInit {

  editedProducts?: IProduct | null = null;
  productToBeUpdated: number = 0;

  recievedPrd?: any = {} as IProduct;
  listOfCat: ICategory[] = [];

  userEditForm!: FormGroup;
  base64: any = ''
  userAction: string = 'Add'
  constructor(private prdService: ProductsService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

    this.userEditForm = fb.group({
      id: [Math.floor(1000 + Math.random() * 900)],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: [''],
      rating: fb.group({
        count: ['', [Validators.required]],
        rate: ['', [Validators.required]]
      }),
    })
  }
  ngOnInit(): void {
    // this.prdService.getAllCategories().subscribe(products => {
    //   this.listOfCat = products
    //   console.log(this.listOfCat);
    // })

    this.prdService.getCategoryListObservable().subscribe(categories => {
      this.listOfCat = categories
    })
    this.productToBeUpdated = Number(this.activatedRoute.snapshot.paramMap.get('pid'))

    if (this.productToBeUpdated == 0) {
      this.userAction = "Add"

    } else {
      this.userAction = "Edit"
      this.editedProducts = this.prdService.getItemById(this.productToBeUpdated);

      console.log("this.editedProducts");
      console.log(this.editedProducts);


      {
        this.base64 = this.editedProducts?.image
        this.recievedPrd = this.userEditForm.patchValue({
          id: this.editedProducts?.id,
          title: this.editedProducts?.title,
          price: this.editedProducts?.price,
          description: this.editedProducts?.description,
          category: this.editedProducts?.category,
          image: this.editedProducts?.image,
          rating: ({
            count: this.editedProducts?.rating?.count,
            rate: this.editedProducts?.rating?.rate
          }),
        })
      }


    }


  }



  saveEdit() {
    let productModel: IProduct = this.userEditForm.value as IProduct;

    // editItem(index: number) {
    // const updatedItem = prompt('Edit the item:', this.editedProducts[index]);
    // if (updatedItem !== null) {
    this.prdService.updateItem(productModel);
    this.location.back();

    // }
    // }
    // this.prdService.getAllProducts().subscribe(products => {
    //   this.editedProducts = products
    //   if("updatedProducts" in localStorage){
    //     // localStorage.setItem("updatedProducts", JSON.stringify(this.editedProducts));
    //     var allEntries = JSON.parse(localStorage.getItem("updatedProducts")!);
    //     const filtered = allEntries.filter((item: any) => item.id !== productModel.id);
    //     console.log(filtered);
    //     filtered.unshift(productModel);
    //     localStorage.setItem('updatedProducts', JSON.stringify(filtered));
    //     this.location.back();
    //   }else{
    //     var allEntries = JSON.parse(localStorage.getItem("updatedProducts")!);
    //     const filtered = allEntries.filter((item: any) => item.id !== productModel.id);
    //     console.log(filtered);
    //     filtered.unshift(productModel);
    //     localStorage.setItem('updatedProducts', JSON.stringify(filtered));
    //     this.location.back();

    //   }


    // })

  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  addProduct() {
    let productModel: IProduct = this.userEditForm.value as IProduct;
    this.prdService.addItem(productModel);
    this.location.back();
    // Clear the input field
    // this.newItem = '';


    // this.prdService.getAllProducts().subscribe(products => {
    //   //should use toast to display success message using material angular
    //   // this.router.navigateByUrl('/Products');
    //   this.addedProduct = products
    //   this.addedProduct?.unshift(productModel)
    //   this.prdService.addProduct(this.addedProduct)
    //   let filtered = [];
    //   let exist = JSON.parse(localStorage.getItem("updatedProducts")!);
    //   console.log("exist");
    //   console.log(exist);
    //   filtered.unshift(this.addedProduct);
    //   console.log("filtered");
    //   console.log(filtered);
    //   localStorage.setItem('updatedProducts', JSON.stringify(filtered[0]));
    //   this.location.back();
    //   // localStorage.setItem("AddedProduct", JSON.stringify(this.addedProduct));
    // })
  }

  get pTitle() {
    return this.userEditForm.get('title')
  }

  fillForm() {
    this.userEditForm.patchValue({
      title: 'Vodafone Egypt',
      price: 100000,
      description: 'Telecommunication Company',
      image: '',
      category: 'Corporate',
      quantity: ({
        count: 2,
        rate: 5
      })
    })
  }

  getImagePath(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result
      this.userEditForm.get('image')?.setValue(this.base64)
      console.log(this.base64);
    };
  }

}
