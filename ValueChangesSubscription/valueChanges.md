# Suscribirse a los cambios de un control en el form.

### Al suscribirse a unos cambios siempre estaremos escuchando los cambios en este control que nosotros asignamos. Esto sirve en casos donde tenemos inputs disabled que se ajustan al cambio de un valor.

Por ejemplo en el ejercicio de electricidad se decia que cada Modulo de Electricidad tenia un precio fijo y slots fijos, y no tenia que ser un espacio rellenable por el usuario. Yo lo aplique de la siguiente forma:

- Apenas declaro el formulario me suscribo a los cambios del moduleType.
```ts
addModule() {
    const newModuleForm = new FormGroup({
        moduleType: new FormControl('', Validators.required),
        ambient: new FormControl('', Validators.required),
        price: new FormControl({ value: '', disabled: true }, Validators.required),
        places: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    this.modules.push(newModuleForm);

    newModuleForm.get('moduleType')?.valueChanges.subscribe(value => {
        this.moduleTypeChanged(this.modules.length - 1);
    });
}
```

- La funcion moduleTypeChanged, lo unico que hace es setear esos valores disabled.
```ts
moduleTypeChanged(index: number) {
    const moduleControl = this.modules.at(index);
    const selectedType = moduleControl.get('moduleType')?.value;
    const price = moduleControl.get('price');
    const slots = moduleControl.get('places');

    for (let module of this.modulesTypes) {
        if (module.id === selectedType.id) {
            price?.setValue(module.price);
            slots?.setValue(module.slots);
            break;
        }
    }
}
```

- En caso de no entender esto muy bien yo recomiendo el uso del evento `(change)` en el input que sea necesario, creo que tiene una funcion parecida y no es tan compleja.
- La explicacion fue dada con un FormArray, en caso de que sea un FormGroup normal, nos suscribiriamos en el `ngOnInit()` de la siguiente forma:
```ts
ngOnInit(): void {
    this.budgetForm.controls['date']?.valueChanges.subscribe((value) => {
        console.log("ASD")
    })
}
```