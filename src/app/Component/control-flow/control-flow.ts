import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-flow',
  imports: [FormsModule],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.css', 
})
export class ControlFlow {

  selectedcast : string ='';
  isactive = signal<boolean>(true);

  onchange(value: boolean){
    this.isactive.set(value);
  }

  Cityarr = ["Pune" , "mumbai","solapur","nashik"];

  Studentlist = [
    {fname:"Akash",lname:"Navale", City:"pandharpur" },
    {fname:"sandip ",lname:"kore", City:"pune" },
    {fname:"Manoj",lname:"kumar", City:"kolhapur" },
    {fname:"naman",lname:"dhor", City:"sangli" }

  ]

}
