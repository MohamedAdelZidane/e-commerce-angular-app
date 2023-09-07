import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionAdsService {

  private adsList: string[];
  constructor() { 
    this.adsList = ["Big Discounts",
                    "Sale Up To 50%",
                    "Check our white friday offers",
                    "Special white friday offers up to 70%"]
  }

  getScheduledAds(IntervalInSeconds: number): Observable<string>{
    return new Observable <string>((observer) => {
      // observer.next();
      // observer.error();
      // observer.complete();
      let counter =0;
      let adsTimer = setInterval(()=>{
        console.log('in interval');
        
        if(counter==this.adsList.length){
          observer.complete();
        }
        if(this.adsList[counter] == "")
          observer.error("Empty Ad. !")

        observer.next(this.adsList[counter]);
        counter++;

      },IntervalInSeconds*1000);

      return {
        unsubscribe(){
          //will be called in err,complete, w unsubscribe
          clearInterval(adsTimer);

        }
      }
    });
  }

  getSerialAds() : Observable<string>{
    // return of("ad1", "ad2", "ad3")
    return from(this.adsList)
  }
    
}
