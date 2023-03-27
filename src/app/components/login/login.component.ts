import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm: any){
    console.log("Form is Submitted")
    console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response: any)=> {
        this.userAuthService.setRoles(response.user.role)
        this.userAuthService.setToken(response.jwtToken)
        const role = response.user.role[0].roleName
        if(role === 'Admin'){
          this.router.navigate(['/admin'])
        }
        else{
          this.router.navigate(['/user'])
        }
      },
      (error)=> {
        console.log(error)
      }
    )
  }

}
