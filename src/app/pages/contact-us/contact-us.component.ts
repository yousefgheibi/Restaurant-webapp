import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactformValue!: FormGroup;
  contactModelObj: ContactModel = new ContactModel();
  constructor(private formbuilder: FormBuilder, private _api: ContactService) {}

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

    this._api.send(this.contactModelObj).subscribe(
      (res) => {
        this.contactformValue.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
