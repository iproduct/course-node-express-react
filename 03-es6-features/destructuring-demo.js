let persons2 = [
  {
    name: 'Michael Harrison',
    parents: {
      mother: 'Melinda Harrison',
      father: 'Simon Harrison',
    }, 
    age: 35
  },
  {
    name: 'Robert Moore',
    parents: {
      mother: 'Sheila Moore',
      father: 'John Moore',
    }, 
    age: 25
  }];
for (let { name: n, parents: { father: parent }, age } of persons2) {
  console.log(`Name: ${n}, Mother: ${parent}, age: ${age}`);
}