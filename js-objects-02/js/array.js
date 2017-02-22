function test() {
    var a = ["first", "second", "third", "second", "fourth", "second", "fifth"];
    log(a.lastIndexOf("second", -3));
    var emloyees = [
        {name:"John", age:35},
        {name:"Sara", age:45},
        {name:"Bill", age:39},
        {name:"Amy", age:52},
        {name:"Ivan", age:27},
        {name:"Dimitar", age:45},
        {name:"Chris", age:42}
    ];
    function isYoung(age) {
        return age <= 45;
    }
    function nextYear(person){
        return ++(person.age);
    }
    emloyees.map(nextYear).filter(isYoung).forEach(
        function(age){log("age: " + age);});

}