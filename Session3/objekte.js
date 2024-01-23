let obj = {
   "first_name": "lol",
   "last_name": "Hovsepyan",
   "age": 13,
   "tumo_student": true,
   sayName(){
      console.log(this.first_name)
   }

}
console.log(obj)
obj.sayName()