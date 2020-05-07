import { Products } from './../_models/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(
        private http: HttpClient
    ) {}

    getAllObjects() {
        return this.http.get('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1');
    }

    getObject(id: number) {
        return this.http.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
    }

    getReview(text: string) {
        const httpHeaders = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );
        const postData = JSON.stringify({reviewText: [text]});
        console.log(postData);
        return this.http.post('/api', postData, {headers: httpHeaders});
    }
}
