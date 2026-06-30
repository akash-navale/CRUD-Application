import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.html',
  styleUrl: './signal.css',
})
export class Signal {

  Number = 12;

  AngularVersion = signal("20");  // number using signal

  Name = signal<string>("Akash"); // string using signal

  Cityarr = signal<string[]>(["Pune", "Mumbai", "nashik"]);   // array using signal

  Studentobj = signal<any>({       //Object creaTEION USING SIGNAL
    Name: "Sudhir",
    Roll_number: 12
  })




  changename() {
    this.Name.set("Navale")
  }

  AddCity(Newcity: string) {
    this.Cityarr.update((old: string[]) => [...old, Newcity]);

  }

  Changecity(){
    this.Studentobj.update((oldobj:any)=>({...oldobj,Name:"Naman"}));
  }
}


