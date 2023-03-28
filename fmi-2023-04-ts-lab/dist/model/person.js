export class NaturalPerson {
    constructor(id, firstName, lastName, email, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
    }
    get greeting() {
        const contact = this.contact ? ': ' + this.contact.toString() : '';
        return `${this.firstName} ${this.lastName} - ${this.email}${contact}`;
    }
}
//# sourceMappingURL=person.js.map