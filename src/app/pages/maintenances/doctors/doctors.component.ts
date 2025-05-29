import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctors.component.html',
  styles: ``
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  tempDoctors: Doctor[] = [];
  isLoading = true;
  private imgSubs!: Subscription;

  constructor(private doctorService: DoctorService, private modalImageService: ModalImageService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalImageService.imageUpdated.subscribe(() => this.loadDoctors())
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadDoctors() {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.tempDoctors = doctors;
      this.isLoading = false;
    })
  }

  searchDoctors(searchedValue: string) {
    if (searchedValue.trim().length === 0) {
      this.doctors = this.tempDoctors;
      return;
    }

    this.searchService.searchByType('doctors', searchedValue)
      .subscribe(doctors => this.doctors = doctors);
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id as string, doctor.img)
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: "Are you sure?",
      text: `${doctor.name} is going to be deleted, you won't be able to revert this!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.doctorService.deleteDoctor(doctor._id as string).subscribe({
            next: () => {
              this.loadDoctors()
              Swal.fire('Deleted', `${doctor.name} has been deleted`, 'success');
            },
            error: (e) => {
              console.log('Error', e);
              Swal.fire('Deleted', `An error has ocurred while deleting the doctor`, 'error');
            }
          });
        }
      });
  }

}
