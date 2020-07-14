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

  getFilteredProducts(type, category, brand, model): Observable<any[]> {
      let params = new HttpParams()
      
    if (type.length != 0) {
      params = params.set('type', type.toString());
    }
    if (category.length != 0) {
      params = params.set('category', category.toString())
    }
    if (brand.length != 0) {
      params = params.set('brand', brand.toString())
    }
    if (model.length != 0) {
      params = params.set('model', model.toString())
    }
    return this.http.get<any[]>(`${environment.serviceUrl}/${this.url}`, {params: params})
  }
  
  getProductByCategory(category): Observable<any> {
    const params = new HttpParams().set('category', category.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByType(type): Observable<any> {
    const params = new HttpParams().set('type', type.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByModel(model): Observable<any> {
    const params = new HttpParams().set('model', model.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByBrand(brand): Observable<any> {
    const params = new HttpParams().set('brand', brand.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByBarcodeId(barcodeId): Observable<any> {
    const params = new HttpParams().set('barcode_id', barcodeId.toString())
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}`, {params: params});
  }

  getProductByProductId(productId): Observable<any> {
    return this.http.get<any>(`${environment.serviceUrl}/${this.url}/${productId}`);
  }

  deleteProductById(productId): Observable<any> {
    return this.http.delete(`${environment.serviceUrl}/${this.url}/${productId}`);
  }

}
