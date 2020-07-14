import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() DisplayResult: EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup;
  applianceType: String;
  model: String;
  brand: String;
  category: String;
  products: Product [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      ApplianceType: new FormControl(''),
      Model: new FormControl(''),
      Brand: new FormControl(''),
      Category: new FormControl('')
    })
  }

  search() {
    this.applianceType = this.searchForm.value.ApplianceType;
    this.model = this.searchForm.value.Model;
    this.brand = this.searchForm.value.Brand;
    this.category = this.searchForm.value.Category;

    console.log(this.applianceType, this.model, this.brand)

    if (!this.applianceType && !this.model && !this.brand && !this.category) {
      this.snackBar.open("All fields cannot be empty!", "Search", {
        duration: 4000
      })
    } else {
      this.productService.getFilteredProducts(this.applianceType, this.category, this.brand, this.model).subscribe(data => {
        this.products = data
        console.log(this.products.length)
        if (this.products.length) {
          this.DisplayResult.emit(this.products)
        } else {
          this.snackBar.open("No Results Found!", "Search", {
            duration: 4000
          })
        }
    }
    )
    } 
  }

}
