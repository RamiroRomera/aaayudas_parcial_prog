# Validacion Asincronica

### Consejo: Yo normalmente para los validadores sincronicos hago una carpeta aparte `src -> app -> validators-> async`

### Las validaciones para que pasen del todo, tienen que ir hasta el final de nuestra funcion sin tocar ningun return que devuelva `true`, solo en ese caso no tendremos ningun error. En caso de que sea un null o of(null), significa que la validacion pasara con exito, sin que salte ningun error. Y si ven que pongo varios null antes del `if` grande es pq hay otros validadores sincronicos que se encargan que los valores no queden vacios, como el `Validators.required`.

Los import necesarios para hacer un validador sincronico son:
```ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, switchMap, timer, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
```

Es de mencionar que normalmente las validaciones async conllevan pegarle al back, entonces normalmente le inyectaremos por parametro un servicio que tengamos. En este caso `PlotService`.
```ts
import { PlotService } from "../services/plot.service";
```

Normalmente empiezan asi:
```ts

export const plotValidator = (service: PlotService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.parent) {
            return of(null);
        }

    }
}
```

Despues del if (.parent), vamos a obtener los valores de nuestro formulario, en este caso son 2, pero puede ser 1 o todos. Y despues de tenerlos tenemos que verificar que no sean undefined estos valores, ya que necesitamos los dos por igual, en caso de ser uno o todos, es el mismo procedimiento.
```ts
const plotNumber = control.parent.get('plotNumber')?.value;
const blockNumber = control.parent.get('blockNumber')?.value;

if (!plotNumber || !blockNumber) {
    return of(null);
}
```

### Esta es la parte del copypaste

Linea 1: Ponemos un `timer` de un 1s. <br>
Linea 2: Hacemos un `SwitchMap`. <br>
Linea 3: Usando nuestro servicio llamamos a la funcion para validar y hacemos un pipe. <br>
Linea 4: Uso un `map`, pq en caso de poder ser mapeado significo que el `plot existia`. Si nosotros tuvieramos que trabajar con valores del objeto que devuelve la `API`, hariamos toda la sucesion if ahi adentro del map.<br>
El resto de lineas es la susecion de if's para hacer que pase la validacion o no, para eso tenemos que ir viendo que nos devuelve la API y hacer los if en relacion a eso.

```ts
return timer(1000).pipe(
    switchMap(() =>
    service.getPlotByPlotNumberAndBlockNumber(plotNumber, blockNumber).pipe(
            map(() => {                
                return of({ plotExists: true }); 
            }),
            catchError((error) => {
            // Status 404 === El plot existe.
            if (error.status === 404) {
                return of(null);
            }
            // Si el back no responde tampoco lo dejo pasar
            return of({ serverError: true });
            })
        )
    )
);
```

Y la aplicacion en el formulario reactivo se hace de la siguiente manera:
<br> En este caso el plotNumber va a almacenar el error en caso de tenerlo. Fijense que la funcion que declaramos en el paso 3 es la misma que aplicamos en el `tercer argumento` del `new FormControl()`.
<br> En caso de que sea un FormArray, se hace de la misma forma en donde declaramos la creacion del form, osea en el `add()`.

```ts
plotForm = new FormGroup({
    plotNumber:  new FormControl('', [Validators.required, Validators.min(1)], [plotValidator(this.plotService)]),
    blockNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    totalArea: new FormControl('', [Validators.required, Validators.min(1)]),
    builtArea: new FormControl('', [Validators.required, Validators.min(1)]),
    plotType: new FormControl('', [Validators.required]),
    plotStatus: new FormControl('', [Validators.required])
});
```

Y para mostrar el fallback de este error, tenemos que usar el mismo mensajes que mandemos como true.
- `getError('serverError')`: Indica que el servidor no tuvo respuesta, osea que se cayo el back.
- `getError('plotExists')`: Indica que ya existe ese nro de lote en la manzana.

```html
@if (plotForm.get('plotNumber')?.dirty && plotForm.get('plotNumber')?.invalid) {
    @if (plotForm.get('plotNumber')?.getError('plotExists')) { <small class="text-danger ms-2">Ya existe ese numero de lote en la manzana.</small> }
    @if (plotForm.get('plotNumber')?.getError('serverError')) { <small class="text-danger ms-2">Error en el servidor, por favor intenta nuevamente.</small> }
}
```

Dejo muchos mas ejemplos de validacion async en <a href="/ValidacionAsinc/validacionAsinc.md">ejemplos</a>, pero van a ver que son todos muy parecidos.
