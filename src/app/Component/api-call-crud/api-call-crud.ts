import { HttpClient } from '@angular/common/http';
import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-api-call-crud',
  imports: [FormsModule],
  templateUrl: './api-call-crud.html',
  styleUrl: './api-call-crud.css',
})
export class ApiCallCrud implements OnInit {

  PhotosList: any[] = [];  //created a variable that can used to print the data through for loop

  newPhoto: any = {      // created a object to post the data into api/ bind this with ngmodel in html
    "albumId": 0,
    "id": 0,
    "title": "",
    "url": "",
    "thumbnailUrl": ""
  }

  cdr = inject(ChangeDetectorRef);
  http = inject(HttpClient)  // new dependency injection.
  // constructor(private http: HttpClient){}   - old way to inject dependency


  ngOnInit(): void {
    debugger;
    this.getAllPhotos();
  }


  getAllPhotos() {
    debugger;
    this.http.get("https://jsonplaceholder.typicode.com/photos").subscribe((result: any) => {       //we use the subscribe method to cath the data. //we get the data in result variable which is in the array format.
      debugger;
      this.PhotosList = result;                                                                 // stored that data in photolist variable
      this.cdr.detectChanges();
    })
  }

  onSavePhoto() {
    debugger
    this.http.post("https://jsonplaceholder.typicode.com/photos", this.newPhoto).subscribe((Response: any) => {
      alert("Api call Sucess");
      debugger
    })
  }

  onUpdatephoto() {
    debugger
    this.http.put("https://jsonplaceholder.typicode.com/photos/" + this.newPhoto.id, this.newPhoto).subscribe((Response: any) => {
      alert("Api call Sucess");
      debugger
    })
  }
  onDelete(id: number) {
    const isdelete = confirm("Are you sure you want to delete this record");
    if (isdelete == true) {
      this.http.delete("https://jsonplaceholder.typicode.com/photos/" + id).subscribe((Response: any) => {
        alert("Api call Sucess");
      })
    }

  }


  onEdit(data: any) {
    this.newPhoto = data;
  }
}









