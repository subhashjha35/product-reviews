import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';

export interface ReviewObject {
  objectID: number;
  reviewText: string;
  reviewScore: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  currReviewObject: ReviewObject;
  imgObjId = [];
  allObjectsId = [];
  allObjects = [];
  productData;
  reviewData = [];
  currEditId: string;
  currPictureObj: any;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllObjects().subscribe((data: {total: number; objectIDs: []}) => {
      this.allObjectsId = data.objectIDs;
      const allObjectsId = this.allObjectsId.slice(0, 50);
      console.log(allObjectsId);

      allObjectsId.map(x => {
        this.productService.getObject(x).subscribe((dataObj: any) => {
          if (dataObj.primaryImageSmall) {
            this.allObjects.push(dataObj);
            this.imgObjId.push(dataObj.objectID);
            this.reviewData.push({objectID: dataObj.objectID, reviewText: '', reviewScore: 0});
          }
        });
      });
      console.log(this.allObjects);
    });
  }
  getReview(): void {
    this.productService.getReview(this.currReviewObject.reviewText).subscribe((score: {reviewScore: number}) => {
      this.currReviewObject.reviewScore = score.reviewScore ? 1 : -1;
      console.log(score);
    });
  }

  editIdChange(id: string) {
    this.currPictureObj = this.allObjects.find((record) => id === record.objectID);
    this.currReviewObject = this.reviewData.find((record) => record.objectID === id);
    console.log(this.currPictureObj);
  }
  editDone() {
    this.getReview();
    this.reviewData = [...this.reviewData.map(x => x.objectID === this.currReviewObject.objectID ? this.currReviewObject : x)];
    console.log('edit done', this.reviewData);
  }
}
