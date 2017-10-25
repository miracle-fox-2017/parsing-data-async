"use strict"
let fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._people = null
  }

  get people() {
    let object = {
      data : this._people,
      size : this._people.length-1
    }
    return object
  }

  get file() {
    return this._file
  }

  set people(dataPerson) {
    this._people = dataPerson
  }

  addPerson(first_name,last_name,email,phone,created_at) {
    let id = parseInt(this._people[this._people.length-1].id)
    this._people.push(new Person(id+=1,first_name,last_name,email,phone,new Date()))
  }

  deletePerson(id) {
    for (let i = 0; i < this._people.length; i++) {
      if(this._people[i].id == id){
        console.log(this._people[i].id, ' deleted');
        this._people.splice(i, 1);
      }
    }
  }

  readFile(callback) {
    let dataFile = fs.readFile(this._file, 'utf8', (err, data)=>{
      if(!err){
        let person = data.split('\n')
        let dataPerson = []
        for (let i = 0; i < person.length; i++) {
          let strSplit = person[i].split(',')
          dataPerson.push(new Person(strSplit[0],strSplit[1],strSplit[2],strSplit[3],strSplit[4],strSplit[5]))
        }
        callback(dataPerson)
      }
    })
  }

  save() {
    let dataPersonSave = [Object.keys(this._people[0])]
    for (let i = 1; i < this._people.length; i++) {
      dataPersonSave.push(Object.values(this._people[i]))
    }
    fs.writeFile(this._file, dataPersonSave.join('\n'), 'utf8',(err)=>{
      if(!err){
        console.log('The file has been saved!');
      }
    })
    return dataPersonSave.join('\n')
  }
}

const faker = require('faker')

let randomFirstName = faker.name.firstName();
let randomLastName = faker.name.lastName();
let randomEmail = faker.internet.email()
let randomPhone = faker.phone.phoneNumberFormat()

let parser = new PersonParser('people.csv')
parser.readFile(data=>{
  parser.people = data  // assign hasil baca file ke property this._people

  // parser.addPerson(randomFirstName,randomLastName,randomEmail,randomPhone);  // addPerson = input dari faker

  // parser.deletePerson(200)  // deletePerson by id

  // parser.save();  // save
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
});
