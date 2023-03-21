//1. typeof narowing
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

console.log(padLeft(12, "Hello"));
console.log(padLeft("____________", "Hello"));


// 2. equality narrowing
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // 3. falsy narrowing
    if (strs) {
      for (const s of strs) {
        console.log(s);
      }
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

printAll(null);
printAll("hello");
printAll(["hello", "world"]);


// 4. in narrowing
type Named = { name: string }
type Fish = { swim: () => void } & Named;
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

function getSmallPet() {
  return Math.random() < 0.5 ? {
    name: `Fish${Math.floor(Math.random() * 100)}`,
    swim() {
      console.log("Fish is swimming"); return;
    }
  }
    : {
      name: `Bird${Math.floor(Math.random() * 100)}`,
      fly() { console.log("Bird is flying"); return; }
    };
}
move(getSmallPet());

// 5. type predicate narrowing
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
// Both calls to 'swim' and 'fly' are now okay.
const pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
if(isFish(zoo[3])) {
  zoo[3].name =  'sharkey';
}
console.log(zoo);
const underWater1: Fish[] = zoo.filter(isFish);
console.log(underWater1);
// or, equivalently
const underWater2 = zoo.filter(isFish) as Fish[];
console.log(underWater2);

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (isFish(pet) && pet.name === "sharkey") return false;
  return isFish(pet);
});
console.log(underWater3);

