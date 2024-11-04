### Suscripcion de un componente a nuestro servicio. En este caso sera el componente `Budget-List`.

<br> 

## Primer Paso -> En la parte de nuestro `@Component`, agregaremos los `providers: []`
```ts
@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
  providers: [BudgetService],
})
```
<hr>

## Segundo Paso -> Inyectaremos el servicio.
```ts
private budgetService = inject(BudgetService);
```
<hr>

## Tercer Paso -> .suscribe()
Usaremos la funcion del servicio, segun sea necesario. En este caso, es para llenar una lista, entonces lo usaremos en el `ngOnInit()`.
<br>Usar la variacion del subscribe que mas les guste, no afecta para nada.

```ts
ngOnInit() {
  this.budgetService.getAllBudgets().subscribe({
    next: result => { this.budgets = result; },
    error: error => console.log(error)
  });
}
```
