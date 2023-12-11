import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Product } from "../common/product";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> { // Map the Json data from Spring Data REST to Product array
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse { // Unwraps the Json from Spring Data REST _embedded entry
  _embedded: {
    products: Product[];
  }
}
