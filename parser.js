"use strict"

let fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
    this.inputToFile = ''
  }

  bacaFile(cb) {
    let data = fs.readFile(this._file, 'utf8', (err, data) => {
      let arrPeople = data.split('\n')
      let dataPeople = []
      for(let i = 1; i < arrPeople.length; i++) {
        let pisahKoma = arrPeople[i].split(',')
        dataPeople.push(new Person(pisahKoma[0], pisahKoma[1], pisahKoma[2], pisahKoma[3], pisahKoma[4], pisahKoma[5]))
      }
      // this._people = dataPeople
      cb(dataPeople)
    })
  }

  get file() {
    return this._file
  }

  set people(dataPeople) {
    this._people = dataPeople
  }

  get people() {
    let obj = {
      data: this._people,
      size: this._people.length-1 //karena dimulai dari index ke - 0
    }
    return obj
    // return this._people
  }

  addPerson(first_name, last_name, email, phone) {
    this._people.push(new Person(this._people.length+1, first_name, last_name, email, phone, new Date()))
  }

  save() {
    let convert = [Object.keys(this._people[0])]
    for(let i = 0; i < this._people.length; i++) {
      convert.push(Object.values(this._people[i]))
    }
    convert = convert.join('\n');
    fs.writeFile(this._file, convert, 'utf8', (err) => {
      if(err) {
        console.log('Save error');
      }
    })
  }

}

let parser = new PersonParser('people.csv')
parser.bacaFile(result => {
  parser.people = result
  parser.addPerson('Davina', 'Bonadilla', 'davina.bonadilla@gmail.com', '085258588122')
  parser.save()
  console.log(parser._people[201]);
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
})
