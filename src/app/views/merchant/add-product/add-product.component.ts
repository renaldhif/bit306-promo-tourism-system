import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private route: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      tripDuration: ['', Validators.required],
      description: ['', Validators.required],
      destination: this.fb.array([], this.validateArrayNotEmpty),
      whatsIncluded: this.fb.array([], this.validateArrayNotEmpty),
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

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

  handleFileInput(event: Event) {
    try {
      const fileInput = event.target as HTMLInputElement;

      if (fileInput.files && fileInput.files.length) {
        this.selectedFile = fileInput.files[0];

        if (this.selectedFile.type !== 'image/jpeg' && this.selectedFile.type !== 'image/png') {
          Swal.fire({
            title: 'Error!',
            text: 'Only JPG and PNG files are allowed.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          // return;
        }
        console.log('filename: ' + JSON.stringify(this.selectedFile.name, null, 2));
      }
    }
    catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while uploading the file.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  validateArrayNotEmpty(control: AbstractControl): ValidationErrors | null {
    return Array.isArray(control.value) && control.value.length && control.value.every(v => v.trim() !== '') ? null : { 'arrayNotEmpty': true };
  }

  onSubmit() {
    const productData = new FormData();
    for (const key of Object.keys(this.productForm.value)) {
      if (key === 'destination' || key === 'whatsIncluded') {
        productData.append(key, JSON.stringify(this.productForm.value[key]));
      } else {
        productData.append(key, this.productForm.value[key]);
      }
    }

    if (this.selectedFile) {
      productData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const userId = this.authService.getUserId() as string;

    // validate form
    if(this.productForm.valid && this.destination != null && this.whatsIncluded != null){
      this.productService.createProduct(productData, userId).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Your product has been added.',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['/merchant/products']);
            }
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while adding the product.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the required fields.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
}

