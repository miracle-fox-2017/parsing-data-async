const fs = require('fs')

"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this.rawData = null
  }

  get people() {
    return this._people
  }

  set people(param) {

    this._people = param

  }

  get file() {

    return this._file

  }

  bacaFile(callback) {

    fs.readFile(this.file, 'utf8', (err, data) => {

      if(err) {

        console.log('file gagal dibaca');

      }

      this.rawData = data

      var arrData = data.split('\n')

      var arrHasil = []

      var arrObj = []

      for(var i = 0; i < arrData.length; i++) {

        arrHasil.push(arrData[i].split(','))

      }

      for(var i = 0; i < arrHasil.length - 1; i++) {

        arrObj.push(new Person(arrHasil[i][0], arrHasil[i][1], arrHasil[i][2], arrHasil[i][3], arrHasil[i][4], new Date(arrHasil[i][5])))

      }

      this._people = arrObj

      callback()

    })

  }

  addPerson(obj) {

    var objPeople = this.people

    objPeople.push(obj)

    this.people = objPeople

  }

  save() {

    var str = 'id,first_name,last_name,email,phone,created_at'

    for(var i = 0; i < this.people.length; i++) {
      str = str + '\n' + this.people[i].id + ','
      str = str + this.people[i].first_name + ','
      str = str + this.people[i].last_name + ','
      str = str + this.people[i].email + ','
      str = str + this.people[i].phone + ','
      str = str + this.people[i].created_at
    }

    fs.writeFileSync(this.file, str)

  }

}

let parser = new PersonParser('people.csv')

parser.bacaFile(() => {

  parser.addPerson(new Person('203','Blaze','Gould','lorem@Nullaeu.org','1-377-980-7889',new Date()))

  parser.save()

})




// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
