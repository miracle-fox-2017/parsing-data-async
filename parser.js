"use strict"

// const fs= require('fs')
// fs.readFile('people.csv','utf8', (err, data) => {
//   if(!err){
//     console.log(data.split('\n'))
//   }else {
//     console.log('error nih')
//   }
// });

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id,first_name,last_name,email,phone,created_at) {
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
    this._people = []
  }
  panggil (callback){
    fs.readFile(this._file, 'utf8',(err, data) => {

      if(!err){
         let dataSplit = data.split('\n')

        for (let i = 1; i < dataSplit.length; i++){

          let indeks = dataSplit[i].split(',')
          let value = new Person (indeks[0], indeks[1], indeks[2], indeks[3], indeks[4], indeks[5]);
          this._people.push(value);
        }
        callback(this._people)

      }else {
        console.log('Gak ada')
      }
    })
  }


  get people() {
    let obj = {
      data : this._file,
      size : this._file.length
    }
    return obj
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  save (){
    fs.appendFile('people.csv', this._people, 'utf8',(err)=>{
      if(!err){
        console.log('berhasil disimpan');
      }
    })
  }

}

let fs = require('fs')
let parser = new PersonParser('people.csv')

  parser.addPerson([201,'Azharie', 'Muhamamd', 'azharie@mail', 08833, new Date()])
  parser.save()

  parser.panggil(function (data){
    console.log(data)
    })
 console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
