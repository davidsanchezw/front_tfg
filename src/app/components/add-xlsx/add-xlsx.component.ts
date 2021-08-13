import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-xlsx',
  templateUrl: './add-xlsx.component.html',
  styleUrls: ['./add-xlsx.component.css']
})
export class AddXlsxComponent implements OnInit {

  id: number;
  rol: number;
  target: DataTransfer;

  //Importante para el excel
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  //Fin
    constructor(private groupService: GroupService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol == 0) this.router.navigate(['/']);
    this.id = this.route.snapshot.params['id'];
  }

  onFileChange(evt: any){
    this.target = <DataTransfer>(evt.target);

    if (this.target.files.length !== 1) throw new Error("No se pueden subir multiples ficheros");
    //Importante para el excel
    const file = evt.target.files[0];
    this.myForm.patchValue({
      fileSource: file
    });
    //Fin
    const reader: FileReader = new FileReader();

    reader.onload = (e:any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read (bstr, {type: 'binary'})
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);

    };

    reader.readAsBinaryString(this.target.files[0]);
  }

  addXLSX(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);
    this.groupService.addXLSX(this.id, formData).subscribe( data =>{
      console.log(data);
      this.goToGroupList();
    },
    error => console.log(error));
  }

  goToGroupList(){
    this.router.navigate(['/groups']);
  }

  onSubmit(){
    this.addXLSX();
  }
}