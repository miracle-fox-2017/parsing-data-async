"use strict";
const fs = require('fs');

class Person {
  constructor(id, fn, ln, email, phone, ca) {
    this.id = id;
    this.firstName = fn;
    this.lastName = ln;
    this.email = email;
    this.phone = phone;
    this.created = new Date(ca).toString();
  }
}

class PersonParser {
  constructor(file, callback) {
    this._file = file;
    this._people = this.files(callback);
  }

  files(callback) {
    const data = fs.readFile(this._file, 'utf-8', (err, data) => {
      if (err) throw err;
      callback(data);
    });
  }

  get people() {
    const obj = {
      data: this._people,
      size: this._people.length
    }

    return obj;
  }

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    let strResult = '';
    strResult += 'id,first_name,last_name,email,phone,created_at\n';
    const objPerson = JSON.parse(JSON.stringify(this._people));
    for (let i = 0; i < objPerson.length; i++) {
      strResult += `${objPerson[i].id},${objPerson[i].firstName},${objPerson[i].lastName},${objPerson[i].email},${objPerson[i].phone},${new Date(objPerson[i].created).toISOString()}\n`;
    }
    fs.writeFileSync('people.csv', strResult);
  }

  get file() {
    return this._file
  }
}

const parser = new PersonParser('people.csv', data => {
  const arrPeople = [];
  
  for (let i = 1; i < data.length; i++) {
    const entity = data[i].split(',');
    const person = new Person(entity[0], entity[1], entity[2], entity[3], entity[4], entity[5]);
    arrPeople.push(person);
  }

  return arrPeople;
});

parser.addPerson(new Person('201', 'Yofriadi', 'Yahya', 'yofriadiyahya@gmail.com', '0812-2524-5168', '2012-05-10T03:53:40-07:00'));
parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)