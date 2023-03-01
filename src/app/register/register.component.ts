import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  //properties
  acno:any;
  pswd:any;
  uname:any;
  // userDetails:any={
  //   1000:{acno:1000, username:"Anagha", password:1000, balance:2000},
  //   1001:{acno:1001, username:"Rithu", password:1001, balance:2000},
  //   1002:{acno:1002, username:"Jishna", password:1002, balance:2000},
    
  // }

  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  Register(){
    var acno=this.acno;
    var pswd=this.pswd;
    var uname=this.uname;
    var userDetails=this.ds.userDetails;
    
    const result=this.ds.register(acno,uname,pswd)
    if(result){
      alert('Register successful')
      this.router.navigateByUrl('')
    }else{
      alert('Register failure')
    }
  }

}