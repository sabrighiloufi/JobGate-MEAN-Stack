import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
companies:any
p: number = 1;
search_name:any
itemPerPage = 5
specialties:any
currentCompany:any
  constructor(private companyService: CompanyService, private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.getCompanies()
    this.getSpecialties()
    this.currentCompany = this.companies[0]
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe((res:any)=>{
      this.companies = res["data"].filter((element:any)=> element.confirmed == true)
      this.currentCompany = this.companies[0]
      console.log(this.companies)
      console.log(this.currentCompany)
    })
  }
  
  getSpecialties(){
    this.specialityService.getSpecialties().subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }
 
  changeCompany(c:any){
    this.currentCompany = c
  }

  getBySpecialties(e:any){
    this.companyService.getCompanies().subscribe((res:any)=>{
      this.companies = res["data"].filter((element:any)=> element.speciality == e && element.confirmed == true)
    })
  }
  deleteCompany(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteCompany(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'company has been deleted.',
            'success'
          )
          this.getCompanies()
        })
        
      }
    })
  }
}
