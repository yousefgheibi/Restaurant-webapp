import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactModel } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactformValue!: FormGroup;
  contactModelObj: ContactModel = new ContactModel();
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactformValue = this.formbuilder.group({
      id: null,
      name: [''],
      email: [''],
      subject: [''],
      message: [''],
    });
  }

  sendEmail() {
    this.contactModelObj.name = this.contactformValue.value.name;
    this.contactModelObj.email = this.contactformValue.value.email;
    this.contactModelObj.subject = this.contactformValue.value.subject;
    this.contactModelObj.message = this.contactformValue.value.message;
  
    console.log(this.contactModelObj);
    
    this.contactformValue.reset();
  }
}
