# Subscription For Destroy
### ADVERTENCIA: En caso de no estar sobrado de tiempo no recomiendo el uso de esto, son detalles unicamente como para llegar al 10.

- Importar `Subscription`
```ts
import {Subscription} from 'rxjs';
```

- Instanciar en el componente:
```ts
private subscription = new Subscription()
```

- Cada vez que hagamos una subscripcion la haremos de la siguiente forma:
```ts
this.subscription.add(
    this.exampleService.createExample(this.example).subscribe({
        next: (data) => { return data; },
        error: (errr) => console.log(error)
    })
)
```

- Como paso final, en el `ngOnDestroy`, haremos lo siguiente:
```ts
ngOnDestroy() {
    this.subscription.unsubscribe();
}
```
