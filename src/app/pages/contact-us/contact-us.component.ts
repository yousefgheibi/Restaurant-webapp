import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactformValue!: FormGroup;
  isSubmitActionDisabled = false;
  contactModelObj: ContactModel = new ContactModel();
  constructor(private formbuilder: FormBuilder, private _api: ContactService,private notification : NotificationService) {}

  ngOnInit(): void {
    this.contactformValue = this.formbuilder.group({
      id: null,
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(GlobalContanst.emailRegex)]],
      subject: ['',[Validators.required]],
      message: ['',[Validators.required]],
    });
  }

  sendEmail() {
    this.contactModelObj.name = this.contactformValue.value.name;
    this.contactModelObj.email = this.contactformValue.value.email;
    this.contactModelObj.subject = this.contactformValue.value.subject;
    this.contactModelObj.message = this.contactformValue.value.message;

    this._api.send(this.contactModelObj).subscribe(
      (res) => {
        this.notification.showSuccess(
          'ایمیل با موفقیت ارسال شد.'
        );
        this.contactformValue.reset();
      },
      (err) => {
        this.notification.showError(
          'ارسال ایمیل با خطا مواجه شد.'
        );
        console.log(err);
      }
    );
  }
}
