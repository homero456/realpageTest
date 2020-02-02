import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public listUsers: any;
  constructor(private route: Router, private serviceUser: UserService,private toastr: ToastrService) {
    serviceUser.getUsers().subscribe(s => {
      this.listUsers = s;
      console.log(this.listUsers);
    }, error => {
      this.toastr.warning('error = ' + error, 'User');
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
        this.toastr.success('User has been deleted', 'User');
      }, error => {
        this.toastr.warning('error list= ' + error, 'User');
        console.log('error = ', error);
  
  
      });
    }, error => {
      this.toastr.warning('error delete = ' + error, 'User');
      console.log('error delete = ', error);

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
