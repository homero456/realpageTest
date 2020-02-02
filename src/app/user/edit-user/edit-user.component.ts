import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public user: User;
  formGroup: FormGroup;
  constructor(private route: Router, private userService: UserService) {

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
      console.log('error = ', error);
    });
  }

  save() {
    this.userService.updateUser(this.user).subscribe(s => {
      alert("User has been edited");
      this.route.navigate(['']);
    }, error => {
      console.log('error = ', error);
    }
    );
  }

}
