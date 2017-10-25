"use strict"
const fs = require('fs')

class Person {
  constructor(id, first, last, email, phone, created_at = new Date()) {
    this.id = id
    this.first_name = first
    this.last_name = last
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

  }

  readData(callback) {
    let dataSplit;
    let indexData;
    let dataSplitKoma;
    fs.readFile(this._file, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        dataSplit = data.split('\n')
        for (let i = 0; i < dataSplit.length; i++) {
          dataSplitKoma = dataSplit[i].split(",")
          this._people.push(new Person(dataSplitKoma[0], dataSplitKoma[1], dataSplitKoma[2], dataSplitKoma[3], dataSplitKoma[4], dataSplitKoma[5]));
        }
        callback();
      }
    })

  }

  get people() {
    let obj = {
      size: [this._people.length - 1]
    }
    return obj
  }

  addPerson(data) {
    let id = +this._people[this._people.length - 1].id + 1
    // console.log(this._people[this._people.length - 1])

    // let newData = '\n' + id + ',' + data.first_name + ',' + data.last_name + ',' + data.email + ',' + data.phone + ',' + data.created_at.toISOString();
    this._people.push(new Person(id, data.first_name, data.last_name, data.email, data.phone));
    //console.log(this._people[this._people.length - 1])
  }
  save() {
    let dataPeople = this._people[this._people.length - 1]
    let newData = '\n' + dataPeople.id + ',' + dataPeople.first_name + ',' + dataPeople.last_name + ',' + dataPeople.email + ',' + dataPeople.phone + ',' + dataPeople.created_at

    fs.appendFile('people.csv', newData, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Data ', newData, ' was appended to the the file');
      }
    })
  }

}
let dataPeople = {
  'first_name': 'Amelia',
  'last_name': 'Rahman',
  'email': 'amel.rahman5@gmail.com',
  'phone': '081318352537',
  'created_at': new Date()
}
let parser = new PersonParser('people.csv')

parser.readData(() => {
  parser.addPerson(dataPeople)
  parser.save()
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
})


