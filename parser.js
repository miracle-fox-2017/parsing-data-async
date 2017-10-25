"use strict"
const fs = require('fs')
const faker = require('faker')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phoneNum, createDate){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNum = phoneNum
    this.createDate = createDate
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {

    return this._people
  }

  readFile(cb){
    let result = []

    fs.readFile(this._file, 'utf-8', (err, data) =>{
      if(!err){
        result = data.split('\n')
        cb(result);
      }
    })
  }

  processFile(data){

    // console.log(data);
    let people =[]

    data.forEach(person =>{
      people.push(person.split(','))
    })

    people.forEach(peopleObj=>{
      this._people.push(new Person(peopleObj[0],peopleObj[1],peopleObj[2],peopleObj[3],peopleObj[4],peopleObj[5]))
    })
  }

  addPerson(personObj) {
    this._people.push(personObj)
  }

  save(){

    let people = ''

    this._people.forEach((person, index) =>{
      if(index < this._people.length-1){
        people +=this.objToString(person)+'\n'  
      }else{
        people +=this.objToString(person)
      }
    })

    fs.writeFile(this._file, people, (err)=>{
      if(!err){
        console.log('Data sudah ditambahkan');
      }
    })
  }

  objToString(obj){
    return obj.id+','+obj.firstName+','+obj.lastName+','+obj.email+','+obj.phoneNum+','+obj.createDate
  }

}

let parser = new PersonParser('people.csv')
parser.readFile(result=>{
  //proses file menjadi array of object
  parser.processFile(result)
  parser.people

  //tambah data ke object yang telah ada
  parser.addPerson(new Person(parser._people.length-1, faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumber(), faker.date.recent()))

  //simpan data ke file csv
  parser.save()  
})
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
