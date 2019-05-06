import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-applicantprofile',
  templateUrl: './applicantprofile.component.html',
  styleUrls: ['./applicantprofile.component.css']
})
export class ApplicantprofileComponent implements OnInit {
  public applicantprofile;
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null){
      this.router.navigateByUrl('')
    }
    else{
      this.applicantprofile = JSON.parse(localStorage.getItem('user'));
      console.log(this.applicantprofile)
    }
 }
 
}
