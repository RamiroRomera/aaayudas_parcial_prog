# Que value usar en las option del select ?

Yo normalmente siempre le mande de pecho el `[ngValue]`, es el que normalmente nunca les va a dar problemas con objetos complejos. Todas las variantes son:
- `[value]="algo"`
- `[ngValue]="algo"`
- `value={{algo}}`

Dejo un ejemplo por las dudas de donde se usaria el `[ngValue]`:
<br> En este ejemplo yo guardo el objeto complejo type, que tenia 4 valores mas pero en ese select yo solo tenia que mostrar el .name y guardar todo el objeto.

```html
<select name="" id="moduleType" class="form-control" formControlName="moduleType">
    @for (type of modulesTypes; track type) {
        <option [ngValue]="type">{{type.name}}</option>
    }
</select>
```

En este otro ejemplo se usa un objeto simple ambient, el cual no tiene valores extras y es como si fuera una variable simple:
```html
<select name="" id="ambient" class="form-control" formControlName="ambient">
    @for (ambient of ambients; track ambient) {
        <option [value]="ambient">{{ambient}}</option>
    }
</select>
```

### CONSEJO: Ante la duda varian con los 3 de arriba y alguno va andar jajaja.