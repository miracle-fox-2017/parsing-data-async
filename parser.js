"use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,firstName,lastName,email,telpon,create_At){
    this.Id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.noTelphone = telpon
    this.creatAt = new Date (create_At)
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.objpeople();
  }

  readfile(){
    let file = this.file
    var read = fs.readFileSync(file,'utf-8').split("\n")
    return read
  }

  // set file(){
  //
  // }

  get file(){
    return this._file
  }

  files(callback) {
    let result = [];

    // console.log('in');
    fs.readFile(this._file, 'utf-8', (err, data) => {
      console.log('in');
      if (err) throw err;
      // console.log(callback(data.split('\n')));
      result = callback(data.split('\n'));
    });
    // console.log(this._people);
    // return this._people;
    // return result;
  }

  objpeople(){
    let file = this.readfile()
    let data = []
    for (let i = 1;i<file.length-1;i++){
      let temp = file[i].split(',')
        data.push(new Person (temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]))
      //
    }
    return data
    // return JSON.stringify(this._people,undefined,4)
  }


  get people() {
    var size =
    {
      data : this._people,
      size : this._people.length
    }
    return size
  }

  addPerson(add) {
    this._people.push(add)
  }
  save (){
    let arr = []
    for(let i = 0;i<this._people.length;i++){
      let temp = []
      for(let key in this._people[i]){
        temp.push(this._people[i][key])
      }
      arr.push(temp)
    }
    // console.log(this._people[200]);
    fs.writeFileSync('people.csv',arr.join('\n'),'utf-8','w')
    // console.log(this._people);
  }
}
// var fs = require('fs')
// var board_string = fs.readFileSync('people.csv')
//   .toString()
//   .split("\n")[1]

let parser = new PersonParser('people.csv')

parser.readfile()
// console.log(parser.people)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// parser.objpeople()
// console.log(parser.people)
parser.addPerson(new Person(201,'agung','pangestu','agung.pangestu@ymail.com','021-291621131','2012-02-22T10:09:03-08:00'))
// console.log(parser.objpeople())
// console.log(parser.people)
parser.save()
// console.log(parser.people)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
