import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formGroup: FormGroup;
  user: User;



  constructor(private route: Router, private userService: UserService,private toastr: ToastrService) { }

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
  }

  save() {
    this.userService.saveUser(this.user).subscribe(u => {
      this.toastr.success('User has been added', 'User');
      this.route.navigate(['']);
    }, error => {
      this.toastr.warning('error list= ' + error, 'User');
        console.log('error = ', error);

    });
  }

  cancel() {
    this.route.navigate(['']);
  }

}
