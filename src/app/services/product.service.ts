import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Product } from "../common/product";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { urls } from 'src/environments/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Por defecto, un api rest devuleve un máximo de 20 elementos
  // Si queremos enviar más para hacer alguna prueba: http://localhost:8080/api/products?size=100
  // Lo correcto es hacerlo mediante paginación
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  public getProductList(theCategoryId: number): Observable<Product[]> { // Map the Json data from Spring Data REST to Product array

    const url = urls.product.findByCategoryId + theCategoryId;

    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse { // Unwraps the Json from Spring Data REST _embedded entry
  _embedded: {
    products: Product[];
  }
}
