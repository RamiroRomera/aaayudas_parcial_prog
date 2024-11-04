# Validacion Asincronica

### Consejo: Yo normalmente para los validadores sincronicos hago una carpeta aparte `src -> app -> validators-> async`

### Las validaciones para que pasen del todo, tienen que ir hasta el final de nuestra funcion sin tocar ningun return, solo en ese caso no tendremos ningun error.

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

export const plotForOwnerValidator = (service: PlotService): AsyncValidatorFn => {
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
            return null;
            }),
            catchError((error) => {
            // Status 404 === El plot existe.
            if (error.status === 404) {
                // Como yo quiero que el lote no exista devuelvo este error
                return of({ plotExists: true }); 
            }
            // Si el back no responde tampoco lo dejo pasar
            return of({ serverError: true });
            })
        )
    )
);
```

Dejo muchos mas ejemplos de validacion async en <a href="/ValidacionAsinc/validacionAsinc.md">ejemplos</a>, pero van a ver que son todos muy parecidos.
