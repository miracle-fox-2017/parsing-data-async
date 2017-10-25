'use strict'
let fs = require('fs');
class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  addPerson(obj) {
    this._people.push(obj);
    return this._people;
  }

  readInput(callback) {

    fs.readFile(this._file, 'utf8', (err, data)=> {
      if (err) {
        console.log('data gagal');
      } else {
        // console.log(data);
        let newArr = [];
        let result0 = data.toString();
        let result = result0.split('\n');
        for (let i = 0; i < result.length; i++) {
          newArr.push(result[i].split(','));
        }

        for (let i = 1; i < newArr.length - 1; i++) {
          // console.log(this.newArr[i][0]);
          let obj = new Person(newArr[i][0], newArr[i][1], newArr[i][2], newArr[i][3], newArr[i][4], newArr[i][5]);
          this._people.push(obj);
          // console.log(newArr);
        }
        callback(this._people);
      }
    });
  }

  get people() {
    return this._people;
  }

  save() {
    let str = 'id, first_name, last_name, email, phone, created_at' + '\n';
    for (var i = 0; i < this.people.length; i++) {
      str += this.people[i].id + ',';
      str += this.people[i].first_name + ',';
      str += this.people[i].last_name + ',';
      str += this.people[i].email + ',';
      str += this.people[i].phone + ',';
      str += this.people[i].created_at + '\n';
    }
    console.log(str);
    fs.writeFile('people.csv', str);
  }
}

let parser = new PersonParser('people.csv');
parser.readInput(function (data) {
  // console.log(data);
  parser.addPerson(new Person('201', 'Chris', 'Tobing', 'christiantobs@gmail.com', '081299407983', Date()));
  parser.save();
})

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
