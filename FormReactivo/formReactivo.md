# Form Reactivo

Todos los import de arriba del todo para estar tranquilo:
```typescript
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

```

El primer paso va a ser hacer el import en el `@Component` en el `imports: []`, ante la duda copien y peguen todo esto en el imports:
```typescript
imports: [
  ReactiveFormsModule,
  FormsModule,
  CommonModule
],
```

Siguiendo la consigna vas haciendo cada prop que te pidan los profes. Recordar que el `FormControl` se puede aplicar a cualquier input/select, sin importar su naturaleza.
```typescript
budgetForm: FormGroup = new FormGroup({
  fecha: new FormControl('', Validators.required),
  cliente: new FormControl('', Validators.required),
  altura: new FormContrl('', Validators.required, Validators.min(1))
})
```

Pasando al HTML, el primer paso es en nuestra etiquera form, declarar la directiva `[formGroup]=""` y la directiva `(ngSubmit)`. Recordar que el formulario deberia tener un button con el `type="submit"`
```html
<form [formGroup]="budgetForm" (ngSubmit)="onSubmit()">
    <!--- INPUTS --->
      <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

Tambien es importante asignar la etiqueta `"formControlName"` en cada input/select. Ejemplo:
```html
      <label class="form-label">Fecha de Cotizacion</label>
      <input type="date" name="" id="fecha"
             class="form-control" formControlName="fecha">

      <label class="form-label">Cliente</label>
      <input type="text" name="" id="cliente"
             class="form-control" formControlName="cliente">

      <label class="form-label">Altura</label>
      <input type="number" name="" id="altura"
             class="form-control" formControlName="altura">
```

Para finalizar el cacheo de errores para mostrar `fallbacks` ( el mensaje rojo indicando que esta mal ).
```html
@if (budgetForm.get('altura')?.touched && budgetForm.get('altura')?.invalid) {
  @if (budgetForm.get('altura')?.getError('required')) { <small class="text-danger ms-2">Campo requerido.</small> }
  @if (budgetForm.get('altura')?.getError('min')) { <small class="text-danger ms-2">El número mínimo es 1.</small> }
}
```

Para obtener todos los valores de nuestra form reactivo en el `onSubmit()`, normalmente es:
```typescript
onSubmit() {
  if (this.budgetForm.valid) {
    console.log(this.budgetForm.value)
  }
}
```
