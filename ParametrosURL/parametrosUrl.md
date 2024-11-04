# Capturar Parametros de la URL

Para capturar parametros de nuestra URL, por ejemplo para que un Form se use para editar, usaremos el `ActivatedRoute`

Para el primer paso, inyectaremos el `ActivatedRoute`
```ts
private activatedRoute = inject(ActivatedRoute)
```

Para capturar una variable lo haremos en el `ngOnInit` de la siguiente manera:
```ts
ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
}
```

Recalco el hecho que mi ruta al formulario en este caso es el siguiente:
```ts
export const routes: Routes = [
  {path: "budget/detail/:id", component: BudgetViewComponent},
];
```

En caso de que el `:id`, sea `:budgetId` o `:jajaPongoCualquierCosa`, se capturara de la misma forma pero cambiando el string del .get(). Ejemplo:
```ts
ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('budgetId');
}
```
O
```ts
ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('jajaPongoCualquierCosa');
}
```