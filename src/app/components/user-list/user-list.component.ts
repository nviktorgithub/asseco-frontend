import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];

  constructor(
    public userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router) {}

  reloadData() {
    this.userService.getUserList().subscribe(res => {
      this.users = res;
    });
  }

  createUser() {
    this.router.navigate(['user-create']);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }

  ngOnInit() {
    this.reloadData();
  }

}
