import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Properties for user registration
  username: String;
  email: String;
  password: String;
  isRegistered = false;

  constructor(private validateService : ValidateService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)){
      console.log("Please fill in all fields");
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      console.log("Please use a valid email");
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe( data => {
      if(data.success){
        //console.log('You are now registered!');
        this.isRegistered = true;
        
        
        setTimeout(() => { this.router.navigate(['/login']);} , 2000);
        
        
      }
      else {
        console.log('Something went wrong');
      }
    });
  }

}
