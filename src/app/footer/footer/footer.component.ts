import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/sharedServices/firebaseService/blogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  familyBlogForm: FormGroup;
  
  constructor(private firebaseService:BlogsService,private toastr: ToastrService) {}

  ngOnInit() {
    this.initFormControls();
  }

  initFormControls()
  {
    let name='';
    let email='';
    let mobile='';

    this.familyBlogForm = new FormGroup({
      'name': new FormControl(name,Validators.required),
      'email': new FormControl(email,[Validators.required,
        Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]),
      'mobile': new FormControl(mobile,[Validators.required,
        Validators.pattern(/^[7-9]{1}[0-9]{9}/)])
    });
  }

  addFamilyBlog()
  {
    let familyMemberDetails={
      name: this.familyBlogForm.get('name').value,
      email: this.familyBlogForm.get('email').value,
      mobile: this.familyBlogForm.get('mobile').value
    }
    this.firebaseService.addBlogFamily(familyMemberDetails);
    this.toastr.success("Congrats you are now a part of Priya Haridas Kotnis Fam!",'Subscribed');
    this.initFormControls();
  }
}
