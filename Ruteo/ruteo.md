# Ruteo

El primer paso para hacer el ruteo es ir al `app-component.ts` y importar esto en el `@Component`:
```ts
imports: [RouterOutlet],
```

Y en el HTML `app-component.html`, ponemos esta etiqueta:
```html
<router-outlet></router-outlet>
```

Y como paso final, vamos a `app.routes.ts` y ponemos las URL, necesarias. Ejemplo:
```ts
export const routes: Routes = [
  {path: "budget/form", component: BudgetFormComponent},
  {path: "budget/detail/:id", component: BudgetViewComponent},
  {path: "budget/list", component: BudgetListComponent}
];
```

## En caso de querer realizar un ruteo desde algun componente a otro, se hace de la siguiente forma:

- Importaremos el Router
```ts
import {Router} from "@angular/router";
```

- Inyectaremos el Router en nuestro componente:
```ts
private router = inject(Router)
```

- Y para hacer un redireccionamiento es asi:
<br> El navigate es como si fuera el href. Recalcar el hecho que el string esta entre `( [ "ruta" ] )`

```ts
toList() {
  this.router.navigate(["/budget/list"])
}
```
