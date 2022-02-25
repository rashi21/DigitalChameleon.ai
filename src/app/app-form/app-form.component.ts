/*
* @Author-Rashi Saxena
* AppFormComponent
*/
import {Component,ElementRef,EventEmitter,Input,OnInit,Output,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css'],
})
export class AppFormComponent implements OnInit {
  @Input() loginSuccessfulAndShowForm: boolean = false;
  @Input() dialogWidth: string = '90vw';
  @Output() close: EventEmitter<any> = new EventEmitter<any>(false);

  @ViewChild('password') passwordBox: ElementRef<HTMLInputElement>;
  @ViewChild('icon') iconBox: ElementRef<HTMLInputElement>;

  currencies: string[] = ['$', 'INR', '£', '€'];
  showErrorsIfInvalid: boolean = false;
  displayUserDetails: boolean = false;

  form: FormGroup;
  passwordMismatch: boolean = false;

  constructor() {
    this.initiateForm();
  }

  ngOnInit(): void {
    this.form.reset();
    this.displayUserDetails = false;
  }

  initiateForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      dob: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      hobbies: new FormControl(''),
      currency: new FormControl(''),
      annualIncome: new FormControl(''),
      agree: new FormControl('', [Validators.required]),
    });
    this.form.reset();
  }

  /**On close method, triggering close event */
  onClose(): void {
    this.loginSuccessfulAndShowForm = false;
    this.close.emit({closed: true,form: null});
  }

  onSubmit(): void {
    this.showErrorsIfInvalid = false;
    if (this.form && this.form.valid) {
      console.log(this.form.value);
      this.form.disable();
      setTimeout(() => {
        this.form.enable();
        this.loginSuccessfulAndShowForm = false;
        this.displayUserDetails = true;
        this.close.emit({closed: true,form: this.form});
      }, 5000);
    } else {
      this.showErrorsIfInvalid = true;
    }
  }

  showPassword(): void {
    this.passwordBox.nativeElement.type =
      this.passwordBox.nativeElement.type == 'text' ? 'password' : 'text';
    this.iconBox.nativeElement.className = (this.iconBox.nativeElement.className) == 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
  }
  validatePassword(): void {
    this.passwordMismatch =
      this.form.value.password === this.form.value.confirmPassword ? false: true;
  }

  onFocus(): void {
    this.showErrorsIfInvalid = false;
  }
}
