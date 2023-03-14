function templateFactory(strings, ...keys) {
    return (function(...values) {
      let dict = values[values.length - 1] || {};
      let result = [strings[0]];
      keys.forEach(function(key, i) {
        let value = Number.isInteger(key) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    });
  }
  
  let t1Closure = templateFactory`${0}${1}${0}!`;
  //let t1Closure = template(["","","","!"],0,1,0);
  console.log(t1Closure('Y', 'A'));                      // "YAY!"
  
  let t2Closure = templateFactory`Result: ${0} ${'foo'}!`;
  //let t2Closure = template([""," ","!"],0,"foo");
  console.log(t2Closure('Hello', {foo: 'World'})); // "Result: Hello World!"
  
  let t3Closure = templateFactory`I'm ${'name'}. I'm almost ${'age'} years old: ${0} `;
  //let t3Closure = template(["I'm ", ". I'm almost ", " years old."], "name", "age");
  console.log(t3Closure('foo', {name: 'MDN', age: 30})); //"I'm MDN. I'm almost 30 years old."
  console.log(t3Closure('bar', {name: 'Yahoo', age: 40})); //"I'm MDN. I'm almost 30 years old."