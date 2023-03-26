import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  formdata: any;
  datas: any;
  id = "";
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();

  }
  load() {
    this.id = "";
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),


    })

    this.api.get("states").subscribe((result: any) => {
      // console.log(result);
      this.datas = result.data
    });

    this.api.get("states").subscribe((result: any) => {
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
    this.api.get("states/" + id).subscribe((result: any) => {
      // console.log(result);

      this.formdata.patchValue({
        name: result.data.name
      })
    })

  }

  submit(data: any) {
    // console.log(data);

    if (this.id != "") {
      this.api.put("states/" + this.id, data).subscribe((result: any) => {
        // console.log(result);
        
        if (result.status == "success") {
          this.load();

        }
      })
    }

    else{
      this.api.post("states", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
  
        }
      })
    }
  }

  delete(id:any){
    this.api.delete("states/" + id).subscribe((result:any)=>{
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