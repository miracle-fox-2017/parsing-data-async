"use strict"
const fs = require('fs');
class Person {
  constructor(obj){
    this.id = obj.id
    this.first_name = obj.first_name
    this.last_name = obj.last_name
    this.email = obj.email
    this.phone = obj.phone
    this.created_at = obj.created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  parsing(cb){
    fs.readFile(this._file, 'utf8', (err, data)=>{
      if(!err){
        let pisah = data.split('\n')
        for (var idx = 1; idx < pisah.length-1; idx++) {
          let dataArray = pisah[idx].split(',');
          let inputData = new Person(
            {
              id: dataArray[0],
              first_name: dataArray[1],
              last_name: dataArray[2],
              email: dataArray[3],
              phone: dataArray[4],
              created_at: new Date(dataArray[5])
            })
          this._people.push(inputData)
        }
        cb()
      } else {
        console.log('Error get data CSV');
      }
    })
  }

  get people() {
    let object = {
      dataPeople : this._people,
      size       : this._people.length
    }
    return object
  }

  addPerson(getData) {
    this._people.push(getData)
  }
  get file() {
    return this._file
  }

  simpan(){
    let save = "id,first_name,last_name,email,phone,created_at,\n";
    this._people.forEach(listData=>{
      save+=listData.id+','
      save+=listData.first_name+','
      save+=listData.last_name+','
      save+=listData.email+','
      save+=listData.phone+','
      save+=listData.created_at.toISOString()+','
      save+='\n'
    })
    fs.writeFile('people.csv', save, (err, tersimpan) => {
      if (err) {
        console.log('Data gagal di simpan');
      } else {
        console.log('Data berhasil di simpan');
      }
    });
  }
}

let parser = new PersonParser('people.csv')
let obj = {
  id: 201,
  first_name: 'Albert',
  last_name: 'Einstein',
  email: 'albert@setyo.com',
  phone: 09876543221,
  created_at: new Date()
}
parser.parsing(()=>{
  // console.log(parser.people);
  parser.addPerson(obj);
  console.log(parser.people.dataPeople[200]);
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
  parser.simpan()
})
