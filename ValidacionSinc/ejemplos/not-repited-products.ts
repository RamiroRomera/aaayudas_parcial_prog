import {AbstractControl, FormArray, FormGroup, ValidationErrors} from "@angular/forms";

export function notRepitedProducts(control: AbstractControl): ValidationErrors | null {

  if (!(control instanceof FormArray)) {
    return null;
  }

  const products = control.controls as FormGroup[];
  const seenProducts = new Map<string, any>();
  let repited = false;

  for (let i = 0; i < control.length; i++) {
    const product = products[i]
    const nombre = product.controls["nombreP"].value;

    if (seenProducts.has(nombre)) {
      repited = true;
      break;
    } else {
      seenProducts.set(nombre, product.value);
    }
  }
  if (repited === true) {
      return { duplicateItem : true };
  } else {
    return null;
  }
}
