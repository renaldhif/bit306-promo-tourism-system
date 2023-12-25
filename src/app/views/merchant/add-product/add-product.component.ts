import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  // selectedFileName: string = 'No file selected';

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
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

  // handleFileInput(event: Event) {
  //   try {
  //     const fileInput = event.target as HTMLInputElement;

  //     if (fileInput.files && fileInput.files.length) {
  //       console.log('masuk dalam if')
  //       this.selectedFile = fileInput.files[0];
  //       if (this.selectedFile.type !== 'image/jpeg' && this.selectedFile.type !== 'image/png') {
  //         Swal.fire({
  //           title: 'Error!',
  //           text: 'Only JPG and PNG files are allowed.',
  //           icon: 'error',
  //           confirmButtonText: 'Ok',
  //         });
  //         return;
  //       }
  //       else {
  //         console.log('masuk dalam else, dia image')
  //         console.log('selectedFile: ' + JSON.stringify(this.selectedFile, null, 2));
  //         this.productForm.patchValue({
  //           image: this.selectedFile.name,
  //         });
  //       }
  //     }
  //   }
  //   catch (error) {
  //     console.error('Error uploading file:', error);
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Something went wrong while uploading the file.',
  //       icon: 'error',
  //       confirmButtonText: 'Ok',
  //     });
  //   }
  // }

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
        // else {
        //   console.log('Entered else statement, it is an image');
        //   console.log('selectedFile name: ' + JSON.stringify(this.selectedFile.name, null, 2));
  
        //   this.productForm.patchValue({image: this.selectedFile.name,}); 
        // }
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

    console.log('productData: ' + JSON.stringify(productData, null, 2));

    this.productService.createProduct(productData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your product has been added.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      (error) => {
        console.error('Error adding product:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while adding the product.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}

