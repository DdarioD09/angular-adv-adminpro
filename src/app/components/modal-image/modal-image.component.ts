import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './modal-image.component.html',
  styles: ``
})
export class ModalImageComponent {
  @ViewChild('choosenFile') choosenFile!: ElementRef<HTMLInputElement>;

  imageToUpload!: File;
  tempImage: string | ArrayBuffer | null = null;

  constructor(public modalImageService: ModalImageService, private fileUploadService: FileUploadService) { }

  closeModal() {
    this.tempImage = null;
    this.choosenFile.nativeElement.value = '';
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {
    const file = event.target.files[0];
    this.imageToUpload = file

    if (!file) {
      this.tempImage = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result;
    }
  }

  updatePicture() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePicture(this.imageToUpload, type, id)
      .then(img => {
        if (img) {
          Swal.fire('Good job!', 'The picture has been updated!', 'success');
          this.modalImageService.imageUpdated.emit(img);
        }
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Oops...', 'The image cannot be uploaded', 'error');
      })
  }

}
