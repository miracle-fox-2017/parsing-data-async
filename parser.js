"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstname, lastname, email, phone, createdAt){
      this.id = id
      this.first_name = firstname
      this.last_name = lastname
      this.email = email
      this.phone = phone
      this.created_at = new Date(createdAt)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.new_person = []
    this._length = 0
  }

  parse(){
    fs.readFile('people.csv', 'utf8', (err, csv)=>{
      if(!err){
        let data_people = csv.split('\n')
        let value = []

        for(let i = 1; i < data_people.length; i++){
          value.push(data_people[i].split(','))
        }

         value.forEach(item=>{
           this._people.push(new Person(
             item[0],
             item[1],
             item[2],
             item[3],
             item[4],
             item[5]
           ))
         })

          this._length = this._people.length
      }
    })
  }

  get people() {
   let  obj = {
      people:this._people,
      size:this._length
    }
    return obj
  }

  get file(){
    return this._file
  }

  addPerson(obj) {
    let value = `\n${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.created_at.toISOString()}`
    this.new_person = value

  }

  save(){
    // console.log(this.people[0]);
    fs.appendFile('people.csv', this.new_person, 'utf8', (err, hasil)=>{
      if(!err){
        console.log('data telah di save');
      }

    })
    // return 
  }
}

let parser = new PersonParser('people.csv')
parser.parse();
// parser.addPerson(new Person('201','tes','tes','tes@gmail.com','12345', Date()))
// parser.addPerson(new Person('202','Zombie','zombie','zombie@gmail.com','12345', Date()))

// parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)


