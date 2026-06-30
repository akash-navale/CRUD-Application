import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  // This array stores the list of students coming from the API.
  // In HTML: Used inside '@for(item of getalldata; ...)' to display the student cards.
  getalldata: any[] = [];

  // Injecting the Angular HttpClient service to send network requests (GET, POST, etc.)
  private http = inject(HttpClient);
  
  // Service to manually tell Angular to update the HTML view when data changes
  cdr = inject(ChangeDetectorRef);
  isEditmode :Boolean = false;
  // This sets up the structure of our form group.
  // In HTML: Linked using [formGroup]="userForm" on the <form> tag.
  // Each field maps to its matching 'formControlName' attribute in the HTML inputs.
  userForm: FormGroup = new FormGroup({
    roll: new FormControl(0),     // Tied to formControlName="roll" in HTML
    gender: new FormControl(""),   // Tied to formControlName="gender" in HTML
    name: new FormControl(""),     // Tied to formControlName="name" in HTML
    dob: new FormControl("")       // Tied to formControlName="dob" in HTML
  });

  // This automatically runs once right when the component page loads up
  ngOnInit(): void {
    this.getdata(); // Fetch the student list immediately on load
  }

  // 1. GET: Fetches all student records from the database
  getdata() {
    this.http.get("https://localhost:44328/api/Student").subscribe({
      next: (res : any) => {
        this.getalldata = res;       // Save the incoming server data into our local array
        this.cdr.detectChanges();    // Force the HTML to refresh and show the updated list
      },
      error: (error) => {
        alert("Error fetching data: " + error.message);
      }
    });
  }

  // 2. POST: Creates and saves a brand new student record
  // In HTML: Triggered when you click the "Save" button -> (click)="OnsaveUser()"
  OnsaveUser() {
    const formvalue = this.userForm.value; // Collect whatever the user typed into the form
    
    this.http.post("https://localhost:44328/api/Student", formvalue).subscribe({
      next: (res: any) => {
        alert("Data added successfully");
        this.getdata(); // Refresh the list so the new student shows up instantly on screen
        this.Reset();   // Clear the form fields
      },
      error: (error) => {
        alert("Error saving: " + error.message);
      }
    });
  }

  // 3. EDIT CLICK: Populates the form with a selected student's info
  // In HTML: Triggered when you click "Edit" on any student card -> (click)="onEdit(item)"
  onEdit(data: any) {
    this.isEditmode=true;
    // patchValue safely fills out the form controls using the clicked student's data
    this.userForm.patchValue({
      roll: data.roll,
      gender: data.gender,
      name: data.name,
      dob: data.dob
    });
  }

  // 4. PUT: Updates an existing student record based on their roll number
  // In HTML: Triggered when you click the "Update" button -> (click)="onUpdate()"
  onUpdate() {
    const formvalue = this.userForm.value;
    const id = formvalue.roll; // Use the roll number as the unique ID in the URL path

    // Maps the frontend camelCase values to match the exact PascalCase properties expected by C#
    const payload = {
      Roll: formvalue.roll,      // Maps to 'stu.Roll' in your C# Controller
      Name: formvalue.name,      // Maps to 'stu.Name'
      Gender: formvalue.gender,  // Maps to 'stu.Gender'
      Dob: formvalue.dob         // Maps to 'stu.Dob'
    };

    debugger; // Pauses code in your browser developer tools for debugging
    
    // Sends the request to /api/Student/{id} along with the updated data payload
    this.http.put(`https://localhost:44328/api/Student/${id}`, payload).subscribe({
      next: (res: any) => {
        alert("Data updated successfully");
        this.getdata(); // Refresh the grid to show the edited changes
        this.Reset();   // Clear out the form back to default state
      },
      error: (error: any) => {
        console.error(error);
        alert("Update failed (400): " + (error.error?.title || error.message));
      }
    });
  }

  // 5. DELETE: Removes a student record from the database
  // In HTML: Triggered when you click the "Delete" button -> (click)="onDelete(item.roll)"
  onDelete(roll: number) {
    // Show a standard browser confirmation popup first
    if (confirm("Are you sure you want to delete this record?")) {
      // Appends the specific student's roll number directly into the URL path
      this.http.delete(`https://localhost:44328/api/Student/${roll}`).subscribe({
        next: () => {
          alert("Deleted successfully");
          this.getdata(); // Refresh the list so the deleted card disappears
        },
        error: (error) => alert(error.message)
      });
    }
  }

  // 6. RESET: Clears out the form data
  // In HTML: Triggered by the "Reset" button -> (click)="Reset()"
  Reset() {
    this.isEditmode = false;
    this.userForm.reset({
      roll: 0,        // Sets Roll back to 0 (which switches the HTML view back to show the "Save" button)
      gender: "",     // Clears Gender text input
      name: "",       // Clears Name text input
      dob: ""         // Clears Date picker selection
    });
  }
}