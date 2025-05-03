import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: ``
})
export class PromiseComponent implements OnInit {

  ngOnInit(): void {

    this.getUsers().then(users => console.log(users));

    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hello world');
    //   }
    //   reject('Something went wrong')
    // });

    // console.log('End Init');
    // promise
    //   .then((messaje) => {
    //     console.log('Hey I finished');
    //     console.log(messaje);
    //   })
    //   .catch((error) => console.log('Error in my promise: ', error));
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2', {
        headers: { 'x-api-key': 'reqres-free-v1' }
      })
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    })
  }

}
