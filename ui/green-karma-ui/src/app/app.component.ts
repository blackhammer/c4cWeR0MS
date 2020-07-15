import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductService } from '../app/services/product.service'
import { ConstantPool } from '@angular/compiler';

interface TabConfig {
  title: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'green-karma-ui';

  public tabs: Array<TabConfig> = [
    { title: 'Search', link: 'search'}, 
    { title: 'Recycle', link: 'recycle'},
    { title: 'About', link: 'about'}
  ];
  scanBarCode: boolean = false;
  products: any;

  constructor(private http: HttpClient,
              private productService: ProductService) { }
}
