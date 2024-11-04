import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, switchMap, timer, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PlotService } from "../services/plot.service";

export const plotValidator = (service: PlotService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    if (!control.parent) {
      return of(null);
    }

    const plotNumber = control.parent.get('plotNumber')?.value;
    const blockNumber = control.parent.get('blockNumber')?.value;

    if (!plotNumber || !blockNumber) {
      return of(null);
    }

    return timer(1000).pipe(
      switchMap(() =>
        service.getPlotByPlotNumberAndBlockNumber(plotNumber, blockNumber).pipe(
          map(() => {
            return { plotExists: true };
          }),
          catchError((error) => {
            if (error.status === 404) {
              return of(null); 
            }
            return of({ serverError: true });
          })
        )
      )
    );
  };
};
