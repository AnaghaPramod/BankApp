import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  acno:any;
  pswd:any;
  amount:any
  acno1:any;
  pswd1:any;
  amount1:any
  constructor(private ds:DataService){ }
ngOnInit():void{}
deposit(){
  var acno=this.acno;
  var pswd=this.pswd;
  var amount=this.amount;
  const result=this.ds.deposit(acno,pswd,amount)
  if(result){
    alert(`${amount} is credited to ${acno} and balance is ${result}`)
  }else{
    alert('Invalid details')
  }
  // alert('Deposit is ready')
}
withdraw(){
  var acno=this.acno;
  var pswd=this.pswd;
  var amount=this.amount;
  const result=this.ds.withdraw(acno,pswd,amount)
  if(result){
    alert(`${amount} is debited to ${acno} and balance is ${result}`)
  }else{
    alert('Invalid details')
  }
  // alert('Withdraw is ready')
}
}
