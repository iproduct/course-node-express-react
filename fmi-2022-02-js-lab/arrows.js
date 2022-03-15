'use strict'

const bob = {
    name: 'Bob',
    firiends:['Alice', 'Jane'],
    printFiends() {
        this.firiends.forEach(f => console.log(`${this.name} knows ${f}`));
    }
}

bob.printFiends()