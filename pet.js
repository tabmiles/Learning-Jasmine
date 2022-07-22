class Pet {
    firstName;
    lastName;
    breed;

    constructor(data = {}){
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.breed = data.breed || '';
        this.fullNamePieces = [data.firstName, data.lastName];
    }

    get fullName() {
        if(this.lastName.length > 0){
            return `${this.firstName} ${this.lastName} ${this.breed}`;
        }
        return `${this.firstName} ${this.breed}`;
    }

    whosAGoodBoy() {
        window.alert(this.fullName);
    }

    getsTreats(){
        const petGetsTreats = confirm('Did they get a treat?');

        if (petGetsTreats) {
            return 'Happy pet!';
        }else{
            return 'Sad pet...';
        }
    }
}