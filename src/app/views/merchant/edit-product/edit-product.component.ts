import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  selectedFile: File | null = null;
  currentImageFilename: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      title: '',
      location: '',
      tripDuration: '',
      description: '',
      destination: this.fb.array([]),
      whatsIncluded: this.fb.array([]),
      price: '',
      category: '',
      image: null,
    });

    this.productId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        (existingProduct) => {
          this.populateForm(existingProduct);
          this.currentImageFilename = existingProduct.image;
        },
        (error) => {
          console.error('Error fetching product details:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while fetching product details!',
          });
        }
      );
    }
  }

  populateForm(product: any) {
    this.productForm.patchValue({
      title: product.title,
      location: product.location,
      tripDuration: product.tripDays,
      description: product.description,
      price: product.price,
      category: product.category,
      // Do not set 'image' here as it is a file input
    });

    // Populate destinations
    const destinationArray = this.productForm.get('destination') as FormArray;
    // destinationArray.clear(); // Clear existing items
    if (Array.isArray(product.destinations)) {
      product.destinations.forEach((dest: string) => {
        destinationArray.push(this.fb.control(dest));
        console.log('dest: ' + dest);
      });
    }

    // Populate whatsIncluded
    const includedArray = this.productForm.get('whatsIncluded') as FormArray;
    // includedArray.clear(); // Clear existing items
    if (Array.isArray(product.includes)) {
      product.includes.forEach((item: string) => {
        includedArray.push(this.fb.control(item));
      });
    }
  }

  handleFileInput(event: Event) {
    try {
      const fileInput = event.target as HTMLInputElement;

      if (fileInput.files && fileInput.files.length) {
        console.log('Entered if statement');
        this.selectedFile = fileInput.files[0];
        // console.log('selectedFile: ' + JSON.stringify(this.selectedFile, null, 2));

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
    const productData = new FormData();
    for (const key of Object.keys(this.productForm.value)) {
      if (key === 'destination' || key === 'whatsIncluded') {
        const arrayValues = this.productForm.value[key];
        if (Array.isArray(arrayValues)) {
          console.log(arrayValues.length)
          for (let i = 0; i < arrayValues.length; i++) {
            productData.append(key, arrayValues[i]);
          }
        } else {
          productData.append(key, arrayValues);
        }
      } else {
        productData.append(key, this.productForm.value[key]);
      }
    }

    if (this.selectedFile) {
      productData.append('image', this.selectedFile, this.selectedFile.name);
    }

    console.log('product data image: ' + productData.get('image'));

    this.productService.updateProduct(this.productId, productData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your product has been updated.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      (error) => {
        console.error('Error updating product:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while updating the product.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  
  
}

