import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ //3rd executed
  constructor(private router:Router,private ds:DataService) {  //1st executed 
  //constructor - used for object initialization
  //it automatically invokes when an object is created
  }
  ngOnInit(): void { //2nd executed
  //initial process of a component
  //when a component is created, at same time it initialize or authorize
  //when a component is created, there is a lifecycle for it
    
  }

  //properties
  aim="Your perfect banking partner"
  account="Please Enter Your Account Number"
  acno:any; //to hold value from the user
  pswd:any;
  


  // userDetails:any={
  //   1000:{acno:1000, username:"Anagha", password:1000, balance:2000},
  //   1001:{acno:1001, username:"Rithu", password:1001, balance:2000},
  //   1002:{acno:1002, username:"Jishna", password:1002, balance:2000},
    
  // }
  //userdefined functions - 4th executed
  // 
  // login(a:any,p:any){
  //   var acno=a.value
  //   var pswd=p.value
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert('Login successful')
  //     }else{
  //       alert('Incorrect password')
  //     }
  //   }else{
  //     alert('user not found')
  //   }
  //   // alert('Login Clicked');
  // }


  login(){
    var acno=this.acno;
    var pswd=this.pswd;
    // var userDetails=this.ds.userDetails;
    
    const result=this.ds.login(acno,pswd)
    if(result){
      alert('Login successful')
      this.router.navigateByUrl('dashboard')
    }else{
      alert('Login failure')
    }
  }


  // acnoChange(event:any){
  //   // console.log(event.target.value);
  //   this.acno = event.target.value;
  //   console.log(this.acno);
    
  // }
  // pswdChange(event:any){
  //   this.pswd = event.target.value;
  //   console.log(this.pswd);
    
    
  // }
  

}
