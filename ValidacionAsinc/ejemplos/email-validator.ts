import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, switchMap, timer, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order";


export const emailValidator = (service: OrdersService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.parent) {
      return of(null);
    }

    const email = control.parent.get('email')?.value;

    if (!email) {
      return of(null);
    }


    return timer(1000).pipe(
      switchMap(() =>
        service.getEmail(email).pipe(
          map((orders: Order[]) => {
            const now = new Date();
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 horas atrás

            const recentOrders = orders.filter(order => {
              const orderDate = new Date(order.timestamp);
              return orderDate >= twentyFourHoursAgo;
            });

            if (recentOrders.length >= 3) {
              return { orderLimit : true }
            }
            return null;
          })
        )
      )
    );
  }
}
