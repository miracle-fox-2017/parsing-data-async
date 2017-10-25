"use strict"

class Person
{
  constructor(id, first_name, last_name, email, phone, created_at)
  {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

  convertToString()
  {
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`;
  }
}

class PersonParser
{

  constructor(file)
  {
    this._file = `./${file}`;
    this._people = [];
  }

  set people(personObj)
  {
    this._people.push(personObj);
  }

  get people()
  {
    let obj =
    {
      people : this._people,
      size : this._people.length
    }
    return obj;
  }

  get file()
  {
    return this._file;
  }

  addPerson(personObj)
  {
    this.people = personObj;
    // save(personObj);
  }

  save()
  {
    let savedString = 'id,first_name,last_name,email,phone,created_at \n';
    let fs = require('fs');
    for (let i = 0; i < this._people.length; i++)
    {
      savedString += this._people[i].convertToString() + "\n";
    }
    fs.writeFileSync(this.file, savedString);
  }

  getPersons()
  {
    let fs = require('fs');
    let dataPerson = ''; // <-----
    fs.readFile(this.file, "UTF-8", function(err, data)
    {
      if (err)
      {
          console.log(err);
      }
      else
      {
          dataPerson = data;
      }
    })
    for (let i = 1; i < dataPerson.length; i++)
    {
      let individualData = dataPerson[i].split(',');
      let person = new Person(individualData[0],individualData[1],individualData[2],individualData[3],individualData[4],individualData[5])
      this.people = person;
    }
  }

}

let parser = new PersonParser('people.csv')

parser.getPersons();
// console.log(parser._people);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.addPerson(new Person(999, "Rizky", "Saputro", "co.terbang@gmail.com", "08123456789", "23-11-2017"))
console.log(parser.people);
parser.save()
