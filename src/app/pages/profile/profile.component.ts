import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../..//services/file-upload.service';
import { CollectionTypeEnum } from 'src/app/enums/collection-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ''
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;
  imageToUpload!: File;
  tempImage: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: () => {
          const { email, name } = this.profileForm.value
          this.user.email = email;
          this.user.name = name;
          Swal.fire('Good job!', 'The user has been updated!', 'success');
        },
        error: (e) => {
          Swal.fire('Oops...', e.error.msg, 'error');
        }
      });
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
    //TODO improve user experience when change profile picture look on intertnet wich option is the best
    this.fileUploadService.updatePicture(this.imageToUpload, CollectionTypeEnum.Users, this.user.uid as string)
      .then(img => {
        this.user.img = img;
        Swal.fire('Good job!', 'The profile picture has been updated!', 'success');
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Oops...', 'The image cannot be uploaded', 'error');
      })
  }

}
