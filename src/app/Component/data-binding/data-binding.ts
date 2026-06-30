import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {

  courseName :string ="Akash navale ";
  username ="Akash";  
  number = 12 ;


 

  constructor(){
      console.log(this.courseName);
     setTimeout(() => {
    this.number=24;
  }, 1000);
  }

  Showalert(){
    alert("Thank you for clicking the button ");
  }
}
