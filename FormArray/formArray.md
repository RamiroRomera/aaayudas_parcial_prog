# Form Array

### ACLARACION: Llamaremos a budgetForm el "Form Padre" y a moduleForm el "Form Hijo".

Asumiendo que ya tenes la implementacion del form reactivo, el form array seria asi, asi estaria en el form:
```typescript
budgetForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    modules: new FormArray([])
})
```

Tenemos que declarar las siguientes funcines:
- get ( para obtener el FormArray ).
```typescript
get modules() {
    return this.budgetForm.controls['modules'] as FormArray;
}
```

- add ( para agregar otro form ). En esta funcion vamos a declarar lo que seria nuestro "form hijo".
```typescript
add() {
    const newModuleForm = new FormGroup({
        moduleType: new FormControl('', Validators.required),
        ambient: new FormControl('', Validators.required),
        price: new FormControl({ value: '', disabled: true }, Validators.required),
        places: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    this.modules.push(newModuleForm);
}
```

- remove ( en caso de querer eliminar un form llamarias esta funcion ). Aclaracion: En caso de que quieran que siempre exista por lo menos un form en el array, pueden iniciar uno en el ngOnInit con add() y aca podrian hacer un if (index <= 1) { return; }
```typescript
remove(index: number) {
    this.modules.removeAt(index)
}
```

Pasando al HTML, dentro de su "form padre" (budgetForm, en este caso), van a tener las siguientes implementaciones, como si estuvieran a la altura de un input normal.
- En algun lado tendria que haber un btn de agregar. Y le agregaremos el evento (click)="add()". Este btn suele estar fuera del ciclo @for que haremos a continuacion.
```html
<button type="button" class="btn btn-success mb-5" (click)="add()">Agregar Modulo</button>
```
- Definiremos un div y adentro del div, un @for de la siguiente manera:
<br>Explico asi por encima que hace, el formArrayName hara referencia a nuestra funcion "get modules()", pero no hara falta el parentesis por el get, y el controls se refiere como si fuera el length. Trakeamos el $index para remover en caso de que sea necesario.
```html
<div class="" formArrayName="modules">

    @for (module of modules.controls; track $index) {

    }
</div>
```

Dentro del form definiremos otro div de la siguiente manera, destacando la directiva [formGroupName]="$index".
```html
@for (module of modules.controls; track $index) {
    <div class="" [formGroupName]="$index">

    </div>
}
```

El proximo paso consiste en lo mas facil, que seria poner todos los inputs dentro de este div que mencionamos anteriormente.
```html
<h4 class="form-label">Modulo #{{$index + 1}}</h4>

<label class="form-label">Tipo Modulo</label>
<select name="" id="moduleType" class="form-control" formControlName="moduleType">
    @for (type of modulesTypes; track type) {
        <option [ngValue]="type">{{type.name}}</option>
    }
</select>

<label class="form-label">Ambiente</label>
<select name="" id="ambient" class="form-control" formControlName="ambient">
    @for (ambient of ambients; track ambient) {
        <option [value]="ambient">{{ambient}}</option>
    }
</select>

<label class="form-label">Precio</label>
<input type="number" name="" id="price" class="form-control" formControlName="price">

<label class="form-label">Lugares</label>
<input type="text" name="" id="places" class="form-control" formControlName="places">
```

En algun momento, nos encontraremos al boton de remover, puede ser una X o un btn danger, lo que sea pero para remover, en el cual asignaremos en el evento (click), nuestra funcion remove($index) pasandole el indice para que sepa cual tiene que remover.
```html
<button type="button" class="btn btn-close m-3" (click)="remove($index)"></button>
```

Al momento de submitear, nuestro "form padre" (budgetForm, en este caso) tendra un array con los valores como si pusieramos el moduleForm.value, pero al ser un array siempre vendra en formato [ ]
```typescript
if (this.budgetForm.valid) {
    console.log(this.budgetForm.value)
}
```
Objeto en console.log(): 
```json
{
    "date": "1/11/2024",
    "client": "Rami",
    "modules": [
        {
            "moduleType": "example1",
            "ambient": "Mi casa",
            "price": 1500,
            "places": 3
        }, {
            "moduleType": "example2",
            "ambient": "Mi patio",
            "price": 300,
            "places": 1
        }
    ]
}
```

Y nuestro HTML tendria que haber quedado algo asi:
```html
<form [formGroup]="budgetForm" (ngSubmit)="onSubmit()">

    <!--- OTROS INPUTS DEL FORM PADRE --->
    <!--- OTROS INPUTS DEL FORM PADRE --->
    <!--- OTROS INPUTS DEL FORM PADRE --->
    <!--- OTROS INPUTS DEL FORM PADRE --->


    <!--- EMPIEZA EL FORM ARRAY --->
    <!--- EMPIEZA EL FORM ARRAY --->
    <!--- EMPIEZA EL FORM ARRAY --->
    <!--- EMPIEZA EL FORM ARRAY --->
    <button type="button" class="btn btn-success mb-5" (click)="add()">Agregar Modulo</button>

    <div class="" formArrayName="modules">

        @for (module of modules.controls; track $index) {
            <div class="" [formGroupName]="$index">
                <h4 class="form-label">Modulo #{{$index + 1}}</h4>
                <button type="button" class="btn btn-close m-3" (click)="remove($index)"></button>

                <label class="form-label">Tipo Modulo</label>
                <select name="" id="moduleType" class="form-control" formControlName="moduleType">
                    @for (type of modulesTypes; track type) {
                        <option [ngValue]="type">{{type.name}}</option>
                    }
                </select>

                <label class="form-label">Ambiente</label>
                <select name="" id="ambient" class="form-control" formControlName="ambient">
                    @for (ambient of ambients; track ambient) {
                        <option [value]="ambient">{{ambient}}</option>
                    }
                </select>

                <label class="form-label">Precio</label>
                <input type="number" name="" id="price" class="form-control" formControlName="price">

                <label class="form-label">Lugares</label>
                <input type="text" name="" id="places" class="form-control" formControlName="places">

            </div>
        }
    </div>
    <!--- TERMINA EL FORM ARRAY --->
    <!--- TERMINA EL FORM ARRAY --->
    <!--- TERMINA EL FORM ARRAY --->
    <!--- TERMINA EL FORM ARRAY --->


    <button type="submit" class="btn btn-primary">Enviar</button>

</form>

```