# Http Client

Recordemos el hecho que Fabio suele quitar el `@Injectable`, en caso de tener servicios revisar esta parte.

- Para inyectar el HttpClient en nuestros servicios, tendremos que ir al archivo "`app.config.ts`" y poner lo siguiente:
```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withComponentInputBinding()),
     provideHttpClient()
  ],
};
```

- En caso de que creemos un servicio, tambien tendriamos que agregarlo aca, de la siguiente forma:
<br>En el ejemplo usamos el `BudgetService`

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
    BudgetService
  ],
};
```

Volviendo a la implementacion de servicios `HttpClient`, comenzaremos ejecutando:
```cmd
ng g s Budget
```

Los imports necesarios serian los siguientes:
```ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
```

Entonces, inyectaremos el servicio de `HttpClient` a nuestro servicio.

```ts
private http = inject(HttpClient)
```

Yo suelo definir la URL como un atributo. No es estrictamente necesario.

```ts
url = "http://localhost:3000";
```

Y vamos a definir una funcion GET simple.

<br>La parte del `this.http` hara referencia a nuestro servicio inyectado.
<br>La parte del `get` hace referencia al verbo que usamos para pegarle a la API.
<br>La parte del `<Budget[]>` hare referencia al objeto esperado que mache lo que devuelve la API. En caso de no machear algun atributo o ninguno, los valores del objeto permaneceran nulo.
<br>La ultima parte, es la llamada, la pueden hacer usando comillas normales y concatenando con + o con las mierditas estas raras ``.

```ts
getAllBudgets() {
    return this.http.get<Budget[]>(`${this.url}/budgets`)
}
```

Y como para agregar una funcion POST simple.

<br>Aca lo que queda por explicar es el `{budget}`, que hara referencia al body que mandamos en la peticion.

```ts
createBudget(budget: any) {
  return this.http.post(`${this.url}/budgets`, {budget})
}
```

El servicio estaria listo para su utilizacion. En la carpeta, <a href="/UseService/useService.md">UseService</a>, se explica como usar este servicio.

Solo para brindar mas informacion, voy a dejar en esta carpeta un ejemplo de un servicio hecho por mi del TP con todas las funcionalidad CRUD: <a href="/HttpClient/plot.service.ts.md">plotService</a>

