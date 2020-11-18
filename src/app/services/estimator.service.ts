import { Injectable } from "@angular/core";
import { PhoneModel } from '../models/phoneModel';
import { PhoneTypes } from '../models/PhoneTypes';

@Injectable()
export class EstimatorService {
  isValueBoxVisible: boolean = false;
//   private phoneTypesMockData: PhoneTypes = {
//     results: [
//       {"id": -1, "name": "-- Select Phone type -- "},
//       {"id": 1, "name": "iPhone "},
//       {"id": 2, "name": "Android "},
//       {"id": 3, "name": "Other"},
//      ]
//   }

//   private getPhoneModelsByType(typeId:number):Array<PhoneModel> {
//       console.log(typeId);
//       if (typeId == 1) {
//         return [
//           { "id": 1, "name": "iPhone 7" },
//           { "id": 2, "name": "iPhone 8" },
//           { "id": 3, "name": "iPhone 9" },
//           { "id": 4, "name": "iPhone X" }
//         ]
//       } else if (typeId == 2) {
//         return [
//           { "id": 5, "name": "Pixel 1" },
//           { "id": 6, "name": "Pixel 2" },
//         ]
//       } else if (typeId == 3) {
//         return [
//           { "id": 7, "name": "Windows" },
//           { "id": 8, "name": "Uport" },
//         ]
//       } else {
//         return [];
//       }
//     }

    public onPhoneModelSelect(id:number):string{
      if (id > 0 ) {
      this.isValueBoxVisible = true;}
      else { this.isValueBoxVisible = false;}
      return Math.round(id*50 + 50).toString();
    }
}
