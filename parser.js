"use strict"

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
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')
console.log(parser.people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
