/*
 *  @Author - Rashi Saxena
*   AppComponent
 */

import { ChangeDetectorRef,Component,HostListener, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

const USERNAME = 'username';
const PASSWORD = 'password';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})

/* Main Class*/
export class AppComponent implements OnInit {
  title = 'digitalChameleon';
  loginSuccessfulAndShowForm: boolean = false;
  showError: boolean = false;
  loginForm: FormGroup;

  form: any;
  displayUserDetails: boolean = false;
  dialogWidth: any = 'auto';
  currency: any[] = ['$', 'INR', '£', '€'];
  selectedCurrency: string = '';

  constructor(
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.createControls();
  }

  clearFields(): void {
    this.loginForm.reset();
    this.showError = false;
  }

  createControls(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  /* When Login button is hit*/
  submit(): void {
    if (
      this.loginForm.valid &&
      this.loginForm.value.username == USERNAME &&
      this.loginForm.value.pass == PASSWORD
    ) {
      this.loginSuccessfulAndShowForm = true;
      this.showError = false;
      this.showMessage('success', 'Success', 'Login Successful');
    } else {
      this.showError = true;
      this.showMessage('error', 'Error', 'Login Failed');
    }
  }

  ngOnInit(): void {
    this.dialogWidth = window.innerWidth > 500 ? '62em' : '96vw';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.dialogWidth = window.innerWidth > 500 ? '62em' : '96vw';
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  /** Common method for displaying different messages */
  showMessage(severity: any, summary: any, message: any) {
    this.messageService.add({
      severity: severity,summary: summary,detail: message
    });
  }

  onClose(event: { closed: boolean; form: any }): void {
    this.loginSuccessfulAndShowForm = event.closed;
    this.displayUserDetails = true;

    if (event.form) {
      this.form = event.form;
      this.showMessage('info', 'Info', 'User Created');
    } else {
      this.loginSuccessfulAndShowForm = false;
      this.displayUserDetails = true;
    }
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  logout(): void {
    this.displayUserDetails = false;
    this.loginSuccessfulAndShowForm = false;
    this.showMessage('success', 'Success', 'User Logged Out');
  }
}
