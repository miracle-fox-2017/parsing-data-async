"use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at = new Date()) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.file = 'people.csv'
  }

  getPersonData() {
    for (let i = 1; i < this._file.length; i++) {
      let person = this._file[i].split(',')
      this._people.push(new Person(person[0], person[1], person[2], person[3], person[4], person[5], person[6]))
    }

    return this._people
  }



  get people() {
    let obj = {
      file: this._file,
      size: this._people.length
    }
    return obj
  }




  addPerson(input) {

    this._people.push(input)
    console.log(this._people[this._people.length - 1])
  }

  toString() {
    let arrPeople = []
    for (let i = 0; i < this._people.length; i++) {
      let arrPerson = []
        arrPerson.push(this._people[i].id);
        arrPerson.push(this._people[i].first_name);
        arrPerson.push(this._people[i].last_name);
        arrPerson.push(this._people[i].email);
        arrPerson.push(this._people[i].phone);
        arrPerson.push(this._people[i].created_at);
       
    
    arrPeople.push(arrPerson)
  }
  return arrPeople.join('\n')
}
  save() {
    var writeFile = fs.writeFile('people.csv', this.toString(),function(err){
      if (err) throw err;
    } );
    return true
  }
}

let file = fs.readFile('people.csv', (err,data) => {
  if (err) throw (err);
  return data;
});

let fileSplit = file.split("\r\n")
// let filePure = fs.readFileSync('people.csv', 'utf-8')
// console.log(filePure)
// const circle = require('people.csv');
let parser = new PersonParser(file)
parser.getPersonData()
// parser.addPerson(new Person('12', "Angga", "Priambada", "angga.idabagus@gmail.com", "1111111"));
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

parser.toString()
parser.save()