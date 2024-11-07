import { AbstractControl, ValidationErrors } from "@angular/forms";

export function stockValidator(productStock: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const requestedQuantity = control.value;

    if (requestedQuantity <= productStock) {
      return null;
    }

    return { stockInsuficiente: true };
  };
}
