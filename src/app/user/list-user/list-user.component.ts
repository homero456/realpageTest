import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public listUsers: any;
  constructor(private route: Router, private serviceUser: UserService) {
    serviceUser.getUsers().subscribe(s => {
      this.listUsers = s;
      console.log(this.listUsers);
    }, error => {
      console.log('error = ', error);

    });
  }

  ngOnInit() {
  }
  deleteUser(u: User): void {
    this.serviceUser.deleteUser(u.ID).subscribe(s => {
      this.serviceUser.getUsers().subscribe(s => {
        this.listUsers = s;
        console.log("delete")
        alert("User has been deleted");
      }, error => {
        console.log('error list = ', error);
  
      });
    }, error => {
      console.log('error delete= ', error);

    });
  };
  editUser(u: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", u.ID.toString());
    this.route.navigate(['edit-user']);
  };
  addUser(): void {
    this.route.navigate(['add-user']);
  };

}
