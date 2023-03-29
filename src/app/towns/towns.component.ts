import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.css']
})
export class TownsComponent implements OnInit {

  formdata: any;
  datas: any;
  id = "";
  talukaid:any
  taluka :any;
  constructor(private api: ApiService, route:ActivatedRoute) {

    this.talukaid = route.snapshot.paramMap.get('talukaid');
    console.log(this.talukaid);
    
  }

  ngOnInit(): void {
    this.load();

  }
  load() {
    this.id = "";
    this.api.get("towns/" + this.talukaid).subscribe((result: any) => {
      // console.log(result);
      this.datas = result.data
    });
    this.api.get("talukas/0/" + this.talukaid).subscribe((result: any) => {
      // console.log(result);
      this.taluka = result.data
    });
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      talukaid: new FormControl(this.talukaid),


    })

 
  }

  reset(){
    this.load();
  }

  edit(id: any) {
    this.id = id;
    // console.log(id);
    this.api.get("towns/"+this.talukaid+ "/" + id).subscribe((result: any) => {
      // console.log(result);

      this.formdata.patchValue({
        name: result.data.name
      })
    })

  }

  submit(data: any) {
    // console.log(data);

    if (this.id != "") {
      this.api.put("towns/" + this.id, data).subscribe((result: any) => {
        // console.log(result);
        
        if (result.status == "success") {
          this.load();

        }
      })
    }

    else{
      this.api.post("towns", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
  
        }
      })
    }
  }

  delete(id:any){
    this.api.delete("towns/" + id).subscribe((result:any)=>{
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
