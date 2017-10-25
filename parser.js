// "use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }


}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null;
  }
  get file(){
    return this._file;
  }
  get people() {
    return this._people
  }

  convertCsv(){
  fs.readFile(this._file,"utf-8", (err, data , callback) => {
      if (err) throw err;
      data = data.split("\n")
      this.parserObj(data)
      // parser.addPerson(new Person("201","Ahmad","Shahab","matt.syahab@gmail.com","08983060304",new Date()))
    })
  }

  parserObj(data){
    // console.log(data)
  let people = []
    for (let i = 1 ; i<data.length ; i++){
      let newData = data[i].split(",")
      let person = new Person (newData[0],newData[1],newData[2],newData[3],newData[4],newData[5])
      people.push(person)
    }
    this._people = people
    console.log(this._people)
    return people
  }

  addPerson(data) {
   console.log(data)
  }
}

let parser = new PersonParser('people.csv')
parser.convertCsv()

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

