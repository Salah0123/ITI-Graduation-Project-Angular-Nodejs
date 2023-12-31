import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  models = ['Shirt', 'T-Shirts', 'Trousers', 'Knitwear'];
  colors = ['Red', 'White', 'Black', 'Yellow'];
  size = ['S', 'M', 'L', 'XL', 'XXL'];
  selectedModel: any;
  selectedColor: any;
  selectedSize: any;
  selectedPrice: any;
  minPrice: any;
  maxPrice: any;
  modelCollapsed = false;
  colorCollapsed = true;
  sizeCollapsed = true;
  PriceRangeCollapsed = true;
  categoryId: any;

  constructor(
    private productSer: AllProductService,
    private activatedRouter: ActivatedRoute
  ) {}

  onMinInputChange(event: any) {
    this.minPrice = event.target.value;
    this.selectedPrice = this.minPrice;
  }

  onMaxInputChange(event: any) {
    this.maxPrice = event.target.value;
    this.selectedPrice = this.maxPrice;
  }

  togglemodelCollapsed() {
    this.modelCollapsed = !this.modelCollapsed;
  }
  togglecolorCollapsed() {
    this.colorCollapsed = !this.colorCollapsed;
  }
  togglesizeCollapsed() {
    this.sizeCollapsed = !this.sizeCollapsed;
  }
  togglePriceRangeCollapsed() {
    this.PriceRangeCollapsed = !this.PriceRangeCollapsed;
  }

  onRadioModelChange(e: any) {
    // console.log(e.target.value)
    // console.log(this.selectedPrice)
  }

  getProductsByFilter() {
    this.categoryId=this.activatedRouter.snapshot.paramMap.get('cid');
    console.log(this.categoryId)
    this.productSer
      .getProductsByFilter(
        this.selectedColor,
        this.selectedSize,
        this.maxPrice,
        this.minPrice,
        this.selectedModel,
        this.categoryId
      )
      .subscribe(
        (res: any) => {
          console.log(res.doc);
          this.productSer.productsArray = res.doc;
        },
        (error) => {
          this.productSer.productsArray = [];
          this.productSer.foundProduct = false;
        }
      );
  }
}
