import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public user: User;
  formGroup: FormGroup;
  constructor(private route: Router, private userService: UserService, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.user = new User();
    this.formGroup = new FormGroup({
      userName: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ])
    });
    let userId = localStorage.getItem("editUserId");
    this.userService.getUserId(userId).subscribe(s => {
      console.log(s);
      this.user.ID = s.ID;
      this.user.UserName = s.UserName;
      this.user.Password = s.Password;

    }, error => {
      this.toastr.warning('error = ' + error, 'User');
      console.log('error = ', error);

    });
  }

  save() {
    this.userService.updateUser(this.user).subscribe(s => {
      this.toastr.success('User has been edited', 'User');
      this.route.navigate(['']);
    }, error => {
      this.toastr.warning('error = ' + error, 'User');
      console.log('error = ', error);
    }
    );
  }
  
  cancel() {
    this.route.navigate(['']);
  }

}
