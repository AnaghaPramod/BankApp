import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(){}
  ngOnInit(): void{}
    @Input() item:string | undefined
    @Output() OnCancel= new EventEmitter(); //to generate an event

    cancel(){
      this.OnCancel.emit();
    }
  
}
