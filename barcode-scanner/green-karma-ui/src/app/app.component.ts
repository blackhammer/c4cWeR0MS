import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface TabConfig {
  title: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'green-karma-ui';

  public tabs: Array<TabConfig> = [
    { title: 'Search', link: 'search'}, 
    { title: 'Recycle', link: 'recycle'},
    { title: 'About', link: 'about'}
  ];
  scanBarCode: boolean = false;
  products: any;
  productsUrl = 'http://127.0.0.1:5000/v1/product';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productsServiceGetProducts()
      .subscribe(
        products => {
          this.products = products;
        }
      )
  }

  productsServiceGetProducts() {
    return this.http
      .get<any[]>(this.productsUrl)
      .pipe(map(data => data));
  }
}
