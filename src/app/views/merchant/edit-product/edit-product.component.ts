import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  productForm: FormGroup;
  // isEdit: boolean = false;
  product: any;
  productId: any;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: '',
      location: '',
      tripDuration: '',
      description: '',
      destination: this.fb.array([]),
      whatsIncluded: this.fb.array([]),
      price: '',
      category: '',
      image: '',
    });
  }

  ngOnInit() {
    // Check if user is editing a product
    const existingProduct = this.product.getProductById(this.productId);
      if (existingProduct) {
        // Populate the form with existing data
        this.productForm.setValue({
          title: existingProduct.title,
          location: existingProduct.location,
          tripDuration: existingProduct.tripDuration,
          description: existingProduct.description,
          destination: existingProduct.destination,
          whatsIncluded: existingProduct.whatsIncluded,
          price: existingProduct.price,
          category: existingProduct.category,
          image: existingProduct.image,
        });
      }
    }

  // Helper methods to add and remove items from FormArray
  addDestinationItem() {
    this.destination.push(this.fb.control(''));
  }

  removeDestinationItem(index: number) {
    this.destination.removeAt(index);
  }

  addWhatsIncludedItem() {
    this.whatsIncluded.push(this.fb.control(''));
  }

  removeWhatsIncludedItem(index: number) {
    this.whatsIncluded.removeAt(index);
  }

  get destination() {
    return this.productForm.get('destination') as FormArray;
  }

  get whatsIncluded() {
    return this.productForm.get('whatsIncluded') as FormArray;
  }

  onSubmit() {
    // Handle form submission
    Swal.fire({
      title: 'Success!',
      text: 'Your product has been edited with data DEBUG: ' + JSON.stringify(this.productForm.value, null, 2),
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

}
