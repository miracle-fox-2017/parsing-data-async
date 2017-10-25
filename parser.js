"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first, last, mail, phone, create_at) {
    this.id = id
    this.first_name = first
    this.last_name = last
    this.email = mail
    this.phone = phone
    this.created_at = create_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people =
    this._arr = []
  }

  get people() {
    let ppl = {
      people : this._people,
      size : this._people.length
    }
    return ppl
  }

  get file(){
    return this._file
  }
  
  encoding(){
    return 'utf-8'
  }
  
  fileReader(file,encoding){
    return fs.readFile(file,encoding)
  }
  
  splitter(file){
    return file.split('\n')
  }
  
  bacaFile(splitter(), fileReader(file,encoding), get file(), encoding()) {
    // Apakah ini termasuk callback?
    let peopleList = splitter(fileReader(get file(), encoding()))
    let peopleArr = []

    for(let i = 0; i < peopleList.length; i++){
      let arr = peopleList[i].split(',')
      this._arr.push(arr)
    }

    for(let i = 1; i < this._arr.length; i++){
      peopleArr.push(new Person(this._arr[i][0],this._arr[i][1],this._arr[i][2],this._arr[i][3],this._arr[i][4],this._arr[i][5],this._arr[i][6]))
    }
    this._people = peopleArr
  }

  addPerson(first_name,last_name,email,phone,created_at) {
    let id = String(this._people.length + 1)

    this._people.push(new Person(id,first_name,last_name,email,phone,created_at))


  }

  save(){
    let stringIt = JSON.parse(JSON.stringify(this._people))
    let property = 'id,first_name,last_name,email,phone,created_at\n'
    for(let i = 0; i < this._people.length; i++){
      property += stringIt[i].id + ',' + stringIt[i].first_name + ',' + stringIt[i].last_name + ',' + stringIt[i].email + ',' + stringIt[i].phone + ',' + stringIt[i].created_at + '\n'
    }
    fs.writeFileSync(this._file, property, 'utf-8')
    // return property
  }

}

let parser = new PersonParser('people.csv')
// console.log(parser);
parser.bacaFile()
parser.addPerson('Fabio','Kounang','fabio@kounang.ng','08124299400','2020-04-30T20:00:03-10.00')
// console.log(parser.people[201]);
// parser.personToArr()
console.log(parser);
// parser.bacaFile()
// parser.arrToObj()
// console.log(parser)
// console.log(parser.people);
// console.log(parser.size);
// console.log(parser.people);
// console.log(parser.save());
parser.save()

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
