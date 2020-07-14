import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  scanBarCode: boolean = false;
  searchBar: boolean = false;
  results: boolean = false;
  welcome: boolean = true;
  products: Product [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openSearchBar() {
    this.scanBarCode = false;
    this.searchBar = true;
    this.results = false;
    this.welcome = false;
  }

  openScanBarcode() {
    this.searchBar = false;
    this.scanBarCode = true;
    this.results = false;
    this.welcome = false;
  }

  DisplayResult(search: any) {
    this.searchBar = false;
    this.scanBarCode = false;
    this.results = true;
    this.welcome = false;
    this.products = search;
  }

}
