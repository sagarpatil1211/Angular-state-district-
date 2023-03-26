import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-talukas',
  templateUrl: './talukas.component.html',
  styleUrls: ['./talukas.component.css']
})
export class TalukasComponent implements OnInit {

  formdata: any;
  datas: any;
  id = "";
  districtid:any
  constructor(private api: ApiService, route:ActivatedRoute) {

    this.districtid = route.snapshot.paramMap.get('districtid');
    // console.log(this.districtid);
    
  }

  ngOnInit(): void {
    this.load();

  }
  load() {
    this.id = "";
    this.api.get("talukas/" + this.districtid).subscribe((result: any) => {
      // console.log(result);
      this.datas = result.data
    });
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      districtid: new FormControl(this.districtid),


    })

 
  }

  reset(){
    this.load();
  }

  edit(id: any) {
    this.id = id;
    // console.log(id);
    this.api.get("talukas/"+this.districtid+ "/" + id).subscribe((result: any) => {
      // console.log(result);

      this.formdata.patchValue({
        name: result.data.name
      })
    })

  }

  submit(data: any) {
    // console.log(data);

    if (this.id != "") {
      this.api.put("talukas/" + this.id, data).subscribe((result: any) => {
        // console.log(result);
        
        if (result.status == "success") {
          this.load();

        }
      })
    }

    else{
      this.api.post("talukas", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
  
        }
      })
    }
  }

  delete(id:any){
    this.api.delete("talukas/" + id).subscribe((result:any)=>{
      // console.log(result);
      if(result.status == "success"){
        this.load();
      }
      else{
        alert("something went wrong")
      }
      
    })
  }


}