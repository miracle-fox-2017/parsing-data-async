"use strict"
var fs = require('fs');

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
    this._file = file
    this._people = null;
    this._data = null;
    this._datpe = null;
  }

  setData(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }

  getPeopleFromCsv(callback) {
   // let peopleData = fs.readFileSync(this._file);
   let peopleData = fs.readFile(this._file, (err, data) => {
      if (err) {
        throw err;
      }

      callback(data.toString());
   });
  } 

  processPeopleData(peopleData) {
    let peopleDataArr = peopleData.toString().split('\n');
    let arrPeople = [];
    let keys = [];

    for (var i = 1; i < peopleDataArr.length; i++) {
      let obj = {};
      let item = peopleDataArr[i].split(',');
      arrPeople.push(new Person(item[0], item[1], item[2], item[3], item[4], item[5]))
    }

    this._people = arrPeople
    return this._people;
  }

  get people() {
    let objPeople = {
      data: this._people,
      size: this._people.length,
    }

    return objPeople
  }

  set people(person) {
    let objPeople = {
      data: person,
      size: person.length,
    }
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    let allPeople = this.people.data;
    allPeople.push(person);
    this.people = allPeople;
  }

  save() {
    let people = JSON.parse(JSON.stringify(this.people.data));
    let strInput = ''; 
    strInput+= 'id,first_name,last_name,email,phone,created_at';

    for (var i = 0; i < people.length; i++) {
      let dateStr = new Date(people[i].created_at);

      strInput += '\n'+people[i].id+',';
      strInput += people[i].first_name+',';
      strInput += people[i].last_name+',';
      strInput += people[i].email+',';
      strInput += people[i].phone+',';
      strInput += people[i].phone+',';
      strInput += dateStr.toISOString();
    }

   
    // fs.writeFileSync(this.file, strInput, 'utf-8');
    fs.writeFile(this.file, strInput, (err) => {
       if (err) throw err;
        console.log('The file has been saved!');
    })
  }
}

let parser = new PersonParser('people.csv')
parser.getPeopleFromCsv(function(data) {
  let arrPeople = parser.processPeopleData(data);
  parser.people = arrPeople;
  
  parser.addPerson(new Person(201,'Mark','Elric','edward@must.com','2-633-389-7173','2012-05-10T03:53:40-07:00'));
  parser.save();
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
});