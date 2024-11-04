# Go Back

Si se quieren ahorrar un problema con el btn de `Volver`, les recomiendo usar esto, imita a los botones de regresar y adelantar del navegador.

- Importamos este Location de @angular
```ts
import {Location} from '@angular/common';
```

- Lo inyectamos
```ts
private location = inject(Location)
```

- Lo usamos en una funcion que yo toda la vida la llame `goBack()`
```ts
goBack() {
    this.location.back();   
}
```

- En nuestro btn de volver, agregamos que en el evento `(click)`, se ejecute el `goBack()`
```html
<button type="button" class="btn btn-secondary" (click)="goBack()">Volver</button>
```