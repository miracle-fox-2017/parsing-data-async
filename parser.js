"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  //id,first_name,last_name,email,phone,created_at
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    let obj = {
      data: this._people,
      size: this._people.length,
    }
    
    return obj
  }
  
  convertPeople(obj) {
    // let dat = fs.readFileSync(this._file, 'utf-8').split('\n');
    fs.readFile(this._file, 'utf-8', (err, data) => {
      let dat = data.split('\n');
      
      // looping
      for(let i = 1; i < dat.length; i++){
        let temp = dat[i].split(',');
        this._people.push(new Person (temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
      }
      
      // show message
      console.log(`There are ${this.people.size} people in the file '${this.file}'.`);
      
      //update id jadi yang last
      // console.log(this._people.length);
      obj.id = this._people.length+1;
      
      // add create at
      let sekarang = new Date(Date.now()).toISOString();
      // console.log(sekarang);
      obj.created_at = sekarang;
      
      this._people.push(obj);
      
      this.save(this._people);
    });
    
  }

  get file(){
    let file = this._file;
    return file;
  }

  addPerson(obj) {}

  save(data){
    // console.log(data[200]);
    let result = "";
    
    //tambah header
    for(let i = 0; i<Object.keys(data[0]).length; i++ ){
      result += Object.keys(data[0])[i];
      if(i<Object.keys(data[0]).length-1){
        result += ',';
      } else {
        result += '\n';
      }
    }
    
    //isinya
    for(let i = 0; i< data.length; i++){
      result += data[i].id + ',' +
      data[i].first_name + ',' +
      data[i].last_name + ',' +
      data[i].email + ',' +
      data[i].phone + ',' +
      data[i].created_at;
      if(i< data.length-1){
        result += '\n';
      } 
    }
    
    // console.log(result);
    
    // print ke file
    // fs.writeFile(this._file, result);
    fs.writeFile('people.csv', result, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

}

let parser = new PersonParser('people.csv')
// parser.convertPeople();
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

parser.convertPeople(new Person(0,'aing', 'maung', 'aing@maung.com', '12345567'));
// console.log(parser._people[parser._people.length-1]);
// parser.save();
