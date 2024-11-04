import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { OwnerService } from "../services/owner.service";
import { catchError, map, Observable, of, switchMap, timer } from "rxjs";


export const docValidator = (ownserService: OwnerService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control.parent) {
            return of(null);
        }
    
        const docNumber = control.parent.get('documentNumber')?.value;
        const docType = control.parent.get('documentType')?.value;


        if(!docNumber || !docType) {
            return of(null);
        }

        return timer(1000).pipe(
            switchMap(() =>
              ownserService.getOwnerByDocAndType(docNumber, docType).pipe(
                map(() => {
                    console.log("existe");
                  return { ownerExists: true };
                }),
                catchError((error) => {
                  if (error.status === 404) {
                    console.log("no encontrado");
                    return of(null); 
                  }
                  console.log("server error");
                  return of({ serverError: true });
                })
              )
            )
        );

    }
}