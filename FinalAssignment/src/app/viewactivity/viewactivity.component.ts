import { Component, OnInit } from '@angular/core';
import { NagpServiceService } from "src/app/services/nagp-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-viewactivity',
  templateUrl: './viewactivity.component.html',
  styleUrls: ['./viewactivity.component.css']
})
export class ViewactivityComponent implements OnInit {
  public activity;
  public levels;
  public batches;
  noElements :boolean;
  filteredApplicants=[];
  constructor(private service: NagpServiceService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('admin')==null){
      this.router.navigateByUrl('')
      } 
    this.getData();
  }
  getData(){
    this.service.getActivity().subscribe(
      data=>{ 
        this.activity=data
        this.filteredApplicants=data;
      console.log(data)},
      err => console.log(err),
      ()=>console.log("Activity loaded")

    );
    this.service.getLevel().subscribe((data)=>{
      this.levels = data;
    })
    this.service.getBatch().subscribe((data)=>{
      this.batches=data;
    })

  }
  filterByLevel(value:string) {
    if(value=="def"){

    }
    else{
    this.noElements = false;
    this.filteredApplicants = [];
    let i=0;
    this.activity.forEach(element => {
      
    if(element.level.levelId === value){
    this.filteredApplicants[i]=element;
    i++;
    }
    });
    } 
  }
  filterByBatch(value:string) {
    this.filteredApplicants = [];
    if(value == "pok"){
      this.filteredApplicants=this.activity;
    }
    else{
      let i=0;
      this.activity.forEach(element => {
      if(element.batch.batchId=== value){
      this.filteredApplicants[i]=element;
      i++;
      }
      });
      } 
    }


}
