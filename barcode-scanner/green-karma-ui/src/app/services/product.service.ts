import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = 'product';

  constructor(private http: HttpClient) {}
    
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serviceUrl}/${this.url}`);
  }
  
  getProductByCategory(productId): Observable<any> {
    const params = new HttpParams().set('category', productId.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByModel(productId): Observable<any> {
    const params = new HttpParams().set('model', productId.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByBrand(productId): Observable<any> {
    const params = new HttpParams().set('brand', productId.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByBarcodeId(productId): Observable<any> {
    const params = new HttpParams().set('barcode_id', productId.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByProductId(productId): Observable<any> {
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}/${productId}`);
  }

  deleteProductById(productId): Observable<any> {
    return this.http.delete(`${environment.serviceUrl}/${this.url}/${productId}`);
  }

}
