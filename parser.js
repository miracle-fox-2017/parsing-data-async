"use strict"
const fs = require('fs')



class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first = first_name
    this.last = last_name
    this.email = email
    this.phone = phone
    this.creat = new Date(created_at)
  }
  // Look at the above CSV file
  // What attributes should a Person object have?


}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.data();
  }

  data() {
    let data = fs.readFile(this._file,'utf-8','r').split('\n');
    let array = []
    for (let i = 1; i < data.length; i++) {
      let sem = data[i].split(',')
      let baru = new Person(sem[0],sem[1],sem[2],sem[3],sem[4],sem[5],sem[6])
      array.push(baru)
    }

    return array;
  }

  get people() {

    let obj = {
      dataObj : this._people,
      size : dataObj.length-1,
    }
    return obj

  }

  get file(){
    return this._file
  }

  addPerson(orang) {
    this._people.push(orang)
  }

  save(){
    let str='';
    for (let i = 0; i < this._people.length; i++) {
      for (let val in this._people[i]) {
        str+=this._people[i][val]+','
      }
      str += '\n'
    }

       return str
      
  }

}

let parser = new PersonParser('people.csv')


console.log(parser.data());
// console.log(parser._people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person('201','alang','mahendra','alangmahendra@gmail.com','002211334455','10-02-1999'))
// console.log(this.people);
console.log(parser.save())
