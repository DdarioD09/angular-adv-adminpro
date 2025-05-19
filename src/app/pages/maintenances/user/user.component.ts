import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent implements OnInit {
  public users!: User[];
  public totalUsers = 0;
  public from = 0;
  public isLoading = true;

  constructor(private userService: UserService, private seachService: SearchService, private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsers();

    this.modalImageService.imageUpdated.subscribe(this.loadUsers);
  }

  loadUsers() {
    this.userService.loadUsers(this.from).subscribe({
      next: ({ total, users }) => {
        this.totalUsers = total;
        this.users = users
        this.isLoading = false;
      },
      error: (e) => console.log(e)
    });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0
      return;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
      return;
    }
    this.loadUsers();
  }

  searchUsers(value: string) {
    if (!value) {
      this.loadUsers();
      return;
    }

    this.seachService.searchByType('users', value)
      .subscribe((users: User[]) => {
        this.users = users
        this.totalUsers = this.users.length
      }
      )
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.uid) {
      Swal.fire('Error', 'You cannot delete yourself', 'error');
      return;
    }

    Swal.fire({
      title: "Are you sure do?",
      text: `${user.name} is going to be deleted, you won't be able to revert this!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user.uid)
            .subscribe({
              next: () => {
                Swal.fire('Deleted!', `${user.name} has been deleted.`, "success");
                this.loadUsers();
              }
            })
        }
      });

  }

  changeRole(user: User) {
    this.userService.updateUser(user);
  }

  openImageModal(user: User) {
    this.modalImageService.openModal('users', user.uid as string, user.img);
  }

}
