import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Customer } from '../customer.model';
import * as fromCustomer from '../state/customer.reducer';
import * as customerActions from '../state/customer.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<fromCustomer.AppState>) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
      id: null
    });

    const customer$: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    );

    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
      }
    });
  }

  updateCustomer() {
    const updateCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
      id: this.customerForm.get('id').value
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updateCustomer));
  }

}
