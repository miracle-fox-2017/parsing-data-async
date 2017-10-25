class Person {
	constructor(id, first_name, last_name, email, phone, created_at) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.phone = phone;
		this.created_at = created_at;
	}
}

class PersonParser {
	constructor(csv_filename) {
		this.csv_filename = csv_filename;
		this.people = [];
	}

	// PersonParse.people
}

