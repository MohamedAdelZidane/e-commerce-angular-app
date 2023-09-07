import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PromotionAdsService } from 'src/app/Services/promotion-ads.service';
import { StoreData } from 'src/app/ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  
storeInfo: StoreData;
isImageShown: boolean=true
constructor(private promoAds: PromotionAdsService){
  this.storeInfo = new StoreData('Our', 'https://picsum.photos/200/300', ['Egypt','Saudia Arabia','United Arab Emirates']);
}
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    
  }

  

ToggleImage(){
  this.isImageShown = !this.isImageShown
}
}
