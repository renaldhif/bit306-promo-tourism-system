import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  // isEdit: boolean = false;
  selectedFileName: string = 'No file selected';

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

  handleFileInput(event: any) {
    try{
      const fileInput = event.target;

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Update the 'image' control in the form with the selected file
        this.productForm.patchValue({
          image: file
        });

        // Update the selectedFileName variable with the selected file name
        this.selectedFileName = file.name;
      } else {
        this.selectedFileName = 'No file selected';
      }
    }catch(err){
      console.log('error: ', err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong: ' + err,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  onSubmit() {
    // Handle form submission
    Swal.fire({
      title: 'Success!',
      text: 'Your product has been added with: ' + JSON.stringify(this.productForm.value, null, 2),
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
}
