import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, switchMap, timer, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from "../services/user.service";

export const emailValidator = (service: UserService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(1000).pipe(
      switchMap(() =>
        service.validateEmail(control.value).pipe(
          map((isAvailable) => {
            return !isAvailable ? { emailExists: true } : null; 
          }),
          catchError((error) => {
            console.error('Error en la validación del email', error);
            return of({ serverError: true });
          })
        )
      )
    );
  };
};
