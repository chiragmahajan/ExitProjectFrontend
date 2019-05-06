import { Component, OnInit } from '@angular/core';
import { NagpServiceService } from "src/app/services/nagp-service.service";
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-viewapplicant',
  templateUrl: './viewapplicant.component.html',
  styleUrls: ['./viewapplicant.component.css']
})
export class ViewapplicantComponent implements OnInit {
  public applicant;
  public appId:number;
  public scoreArray:number[];
  checked:boolean = false
  pts:number
  noElements :boolean;
  filteredApplicants=[];
  clickedId: number
  public levels;
  public batches;
  constructor(private service: NagpServiceService,private router: Router,private sharedService:SharedService) { }

  ngOnInit() {
    if(localStorage.getItem('admin')==null){
      this.router.navigateByUrl('')
      } 
    this.getData();
  }
  getData(){
    this.service.getApplicant().subscribe(
      data=>{ 
        this.applicant=data
        this.filteredApplicants=data;
        },
      err => console.log(err),
      ()=>console.log("Applicant loaded")

    );
    this.service.getLevel().subscribe((data)=>{
      this.levels = data;
    })
    this.service.getBatch().subscribe((data)=>{
      this.batches=data;
    })
  }

  getScore(applicantid:number){
    console.log("Id clicked****"+applicantid);
    this.clickedId = applicantid
    this.service.getScoreByApplicantId(applicantid).subscribe((data)=>{
      this.pts = data;
      this.checked = true;    
    })
  }

  viewActivities(applicantId){
    console.log("successfull")
    this.sharedService.sharedApplicantId=applicantId;
    this.router.navigateByUrl("adminhome/applicantRecordList")
  }

  filterByName(value:string){
    this.filteredApplicants = [];
    this.applicant.forEach(element => {
    if(element.name.toLowerCase() === value.toLowerCase()){
    this.filteredApplicants.push(element);
    }
    });
  
    }

    filterByLevel(value:string) {
      if(value=="def"){
  
      }
      else{
      this.noElements = false;
      this.filteredApplicants = [];
      let i=0;
      this.applicant.forEach(element => {
        
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
        this.filteredApplicants=this.applicant;
      }
      else{
        let i=0;
        this.applicant.forEach(element => {
        if(element.batch.batchId=== value){
        this.filteredApplicants[i]=element;
        i++;
        }
        });
        } 
      }
      
  
    
    clearfilter(){
      this.filteredApplicants=this.applicant
    }
  
}
