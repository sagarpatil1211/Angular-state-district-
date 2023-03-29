import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  formdata: any;
  datas: any;
  id = "";
  stateid:any
  state:any;
  constructor(private api: ApiService, route:ActivatedRoute) {
    this.stateid = route.snapshot.paramMap.get('stateid');
    // console.log(this.stateid);

    
  }

  ngOnInit(): void {
    this.load();

  }
  load() {
    this.id = "";
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      stateid: new FormControl(this.stateid)
    })

    this.api.get("states/"+ this.stateid).subscribe((result:any)=>{
      // console.log(result);
      this.state = result.data 
    })

    this.api.get("districts/" + this.stateid).subscribe((result: any) => {
      // console.log(result);
      this.datas = result.data
    });
  }

  reset(){
    this.load();
  }

  edit(id: any) {
    this.id = id;
    // console.log(id);
    this.api.get("districts/"+this.stateid+ "/" + id).subscribe((result: any) => {
      // console.log(result);

      this.formdata.patchValue({
        name: result.data.name
      })
    })

  }

  submit(data: any) {
    // console.log(data);

    if (this.id != "") {
      this.api.put("districts/" + this.id, data).subscribe((result: any) => {
        // console.log(result);
        
        if (result.status == "success") {
          this.load();

        }
      })
    }

    else{
      this.api.post("districts", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
  
        }
      })
    }
  }

  delete(id:any){
    this.api.delete("districts/" + id).subscribe((result:any)=>{
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
