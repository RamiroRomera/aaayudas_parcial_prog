# Validacion Sincronica

### Consejo: Yo normalmente para los validadores sincronicos hago una carpeta aparte `src -> app -> validators-> sync`

### Las validaciones para que pasen del todo, tienen que ir hasta el final de nuestra funcion sin tocar ningun return que devuelva `true`, solo en ese caso no tendremos ningun error. En caso de que sea un null o of(null), significa que la validacion pasara con exito, sin que salte ningun error. Y si ven que pongo varios null antes del `if` grande es pq hay otros validadores sincronicos que se encargan que los valores no queden vacios, como el `Validators.required`.


Los import necesarios para hacer un validador sincronico son:
```ts
import { AbstractControl, ValidationErrors } from "@angular/forms";
```

La funcion siempre empieza asi:
```ts
export function bankAccountValidator(control: AbstractControl): ValidationErrors | null {

    if (control.parent) {
        return null;
    }

}
```

Despues siempre es agarrar el valor del control que queremos validar y hacer un if mas o menos complejo.
<br>En este caso, las cuentas de banco siempre tienen 22 letras.

```ts
    const bankAccount = control.parent.get('bankAccount')?.value;

    // Validar que tenga 22 dígitos
    if (bankAccount.length !== 22) {
      return { invalidBankAccount: true }
    } else {
        return null;
    }
```

Dejo el ejemplo de una validacion sincronica mas compleja de validacion del CUIT con modulo 11.
```ts
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function cuitValidator(control: AbstractControl): ValidationErrors | null {

    if (!control.parent) {
        return null;
    }

    const cuit = control.parent.get('cuit')?.value;

    if (cuit.length !== 11) {
      return { invalidCuit: true }
    }
  
    const [checkDigit, ...rest] = cuit
      .split('')
      .map(Number)
      .reverse();
  
    const total = rest.reduce(
      (acc: any, cur: any, index: any) => acc + cur * (2 + (index % 6)),
      0,
    );
  
    const mod11 = 11 - (total % 11);
  
    if (mod11 === 11) {
      return checkDigit !== 0 ? { invalidCuit: checkDigit !== 0 } : null
    }
  
    if (mod11 === 10) {
      return { invalidCuit: true }
    }
  
    return checkDigit !== mod11 ? { invalidCuit: checkDigit !== mod11 } : null
}
```

Y se aplicaria de la siguiente forma en un form reactivo:
<br> En caso de que sea un FormArray, se hace de la misma forma en donde declaramos la creacion del form, osea en el `add()`.

```ts
ownerForm = new FormGroup({
    cuit: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), cuitValidator ]),
})
```