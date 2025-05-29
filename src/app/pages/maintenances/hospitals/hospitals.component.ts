import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit, OnDestroy {
  hospitals: Hospital[] = [];
  tempHospitals: Hospital[] = [];
  newHospital!: Hospital;
  isLoading = true;
  imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService, private modalImageService: ModalImageService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImageService.imageUpdated
      .subscribe(() => this.hospitals = this.tempHospitals)
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
      this.tempHospitals = hospitals;
      this.isLoading = false;
    });
  }

  async createHospital() {
    // Create a way to insert the image and the name of the hospital
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: "Hospital's name",
      input: 'text',
      inputPlaceholder: 'Name of the hospital',
      showCancelButton: true
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((hospital) => {
        Swal.fire('Updated', `${hospital.name} has been created`, 'success');
        this.hospitals.push(hospital);
      })
    }
  }

  editHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe(hospitalResp => {
      Swal.fire('Updated', `${hospitalResp.name} has been updated`, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: "Are you sure do?",
      text: `${hospital.name} is going to be deleted, you won't be able to revert this!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.hospitalService.deleteHospital(hospital._id as string).subscribe({
            next: () => {
              Swal.fire('Deleted', `${hospital.name} has been deleted`, 'success');
              this.hospitals = this.hospitals.filter(hospitalItmem => hospitalItmem._id !== hospital._id);
            },
            error: (e) => {
              console.log('Error', e);
              Swal.fire('Deleted', `An error has occurred while deleting the hospital`, 'error')
            }
          });
        }
      });
  }

  openImageModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id as string, hospital.img)
  }

  searchHospitals(searchedValue: string) {
    if (searchedValue.trim().length === 0) {
      this.hospitals = this.tempHospitals;
      return;
    }

    this.searchService.searchByType('hospitals', searchedValue)
      .subscribe(hospitals => this.hospitals = hospitals)
  }

}
