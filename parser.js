"use strict"
let fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(input_obj){
    this.id         = input_obj['id']
    this.first_name = input_obj['first_name']
    this.last_name  = input_obj['last_name']
    this.email      = input_obj['email']
    this.phone      = input_obj['phone']
    this.created_at = input_obj['created_at']
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  getFile(cb){
    // console.log('>>>>>>',this._file);
    fs.readFile(this._file, 'utf8',(err,data)=>{
      if(err){
        console.log('data e**o*')
      }else{
        let rawData = data.split('\n')
        for(let i=1; i<rawData.length-1; i++){
          let arrData     = rawData[i].split(',')
          let read_object = new Person({
            id         : arrData[0],
            first_name : arrData[1],
            last_name  : arrData[2],
            email      : arrData[3],
            phone      : arrData[4],
            created_at : arrData[5],
          })
          this._people.push(read_object)
        }
        cb()
      }
      // console.log(this._people);
    })
  }

  get people(){
    let obj_people = {
      data : this._people,
      size : this._people.length,
    }
    return obj_people
  }

  get file(){
    return this._file
  }

  addPerson(add_person){
    this._people.push(add_person)
  }

  save(){
    let container = []
    for(let i=0; i<this._people.length; i++){
      container+=this._people[i].id + ','
      container+=this._people[i].first_name + ','
      container+=this._people[i].last_name + ','
      container+=this._people[i].email + ','
      container+=this._people[i].phone + ','
      container+=this._people[i].created_at + '\n'
    }
    fs.writeFile('people.csv', container,(err)=>{
      if(err){
        console.log('err save to file');
      }
    })
  }

}

let parser    = new PersonParser('people.csv')
let add_input = new Person({
  id          : 201,
  first_name  : 'reza',
  last_name   : 'aditya',
  email       : 'aditreza@gmail.com',
  phone       : 085959777098,
  created_at  : new Date(),
})

parser.getFile(()=>{
  parser.addPerson(add_input)
  parser.save()
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
})
