## Learning about Jasmine testing
This code was made while following Dylan Israel's Intro to Jasmin Linkedin Learning Course

# Step by Step Examples:

# Example of a test
describe('Modal Component', () => {
    it('opens on click', () => {
        expect(true).toBe(true);
    })
}) 

# How to have test name be same as class name
class Example {
    ...
}
describe(`${Example.name}`, () => {
    ...
})


# Writing a test to check initial values are empty
pet.js
class Pet {
    firstName;
    lastName;
    breed;

    constructor(data = {}){
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.breed = data.breed || '';
    }
}

main.js
describe(`${Pet.name} Class`, () => {
    describe('default values', () => {
        it('first name defaults to empty string', () => {
            //arrange
            const data = {firstname: null};
            // act
            const model = new Pet(data);
            //assert
            expect(model.firstName).toBe('');
        });
        it('last name defaults to empty string', () => {
            //arrange
            const data = {lastName: null};
            // act
            const model = new Pet(data);
            //assert
            expect(model.lastName).toBe('');
        });
        it('breed defaults to empty string', () => {
            //arrange
            const data = {breed: null};
            // act
            const model = new Pet(data);
            //assert
            expect(model.breed).toBe('');
        });
    });
});

# Using beforeEach
pet.js
pet.js
class Pet {
    firstName;
    lastName;
    breed;

    constructor(data = {}){
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.breed = data.breed || '';
    }
}

main.js
describe(`${Person.name} Class`, () => {
    let model;
    // before each runs before each test ('it')
    beforeEach(() => {
        model = new Pet();
    })

    describe('default values', () => {
        it('first name defaults to empty string', () => {
            //assert
            expect(model.firstName).toBe('');
        });
        it('last name defaults to empty string', () => {
            //assert
            expect(model.lastName).toBe('');
        });
        it('middle name defaults to empty string', () => {
            //assert
            expect(model.breed).toBe('');
        });
    });
});

# Testing a function
pet.js
class Pet {
    firstName;
    lastName;
    breed;

    constructor(data = {}){
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.breed = data.breed || '';
    }

    get fullName() {
        if(this.lastName.length > 0){
            return `${this.firstName} ${this.lastName} ${this.breed}`;
        }
        return `${this.firstName} ${this.breed}`;
    }
}

main.js
describe(`${Pet.name} fullname function`, () => {
    let model;

    describe('fullname', () => {
        beforeEach(() => {
            model = new Pet({
                firstName: "Coconut",
                breed:"Chihuahua"
            });
        });
        it('firstname, lastname, and breed are displayed when entered', () => {
            //arrage
            model.lastName = 'Miles'

            //act
            const result = model.fullName

            //audit
            const {firstName: fn, lastName: ln, breed: bn} = model

            //assert
            expect(result).toBe(`${fn} ${ln} ${bn}`);
        });
        it('only firstname and breed are displayed when lastname NOT entered', () => {
            //arrage
            model.lastName = ''

            //act
            const result = model.fullName

            //audit
            const {firstName: fn, breed: bn} = model

            //assert
            expect(result).toBe(`${fn} ${bn}`);
        });
    });
});

# Skipping and Focusing
Note: use for debugging purposes only

Adding a 'f' in front of 'describe' or 'it' will focus it (only run that test):
fdescribe('fullname', () => {
    ...all tests here will run...
});
fit('testing', () => {
    ...this is only test that will run...
});

Adding a 'x' in front of 'describe' or 'it' will skip/exclude it (will run all other tests):
xdescribe('fullname', () => {
    ...all tests here will be skipped...
});
xit('testing', () => {
    ...this test will be skipped...
});

# Spies
describe(`${Pet.name} Class`, () => {
    ...

    describe('whos a good boy', () => {
        it('alert the full name of pet', () => {
            //arange
            model.firstName = 'Coconut'
            model.breed = "Chihuahua"
            spyOn(window, 'alert'); //spy here

            //act
            model.whosAGoodBoy();

            //assert
            expect(window.alert).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith(model.fullName);
        });
    });
});

# Another Spy Example
pet.js
class Pet {
    ...
    getsTreats(){
        const petGetsTreats = confirm('Did ${firstname} get a treat?');

        if (petGetsTreats) {
            return 'Happy pet!';
        }else{
            return 'Sad pet...';
        }
    }
}

main.js
describe(`${Pet.name} Class`, () => {
    ...
    describe('gets treats', () => {
        it('when confirmed is a happy pet', () => {
            //arrange
            spyOn(window, 'confirm').and.returnValue(true);

            //act
            const result = model.getsTreats();

            //act
            expect(result).toBe('Happy pet!');
        });
        it('when NOT confirmed is a sad pet', () => {
            //arrange
            spyOn(window, 'confirm').and.returnValue(false);

            //act
            const result = model.getsTreats();

            //act
            expect(result).toBe('Sad pet...');
        });
    });
});

# Mocks
pet.js
class Pet {
    firstName;
    lastName;
    breed;

    constructor(data, petService){
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.breed = data.breed || '';
        this.fullNamePieces = [data.firstName, data.lastName];
        this.id = data.id;
        this.petService = petService;
    }

    async getFullPetData(){
        return this.petService.getPetById(this.id);
    }
    ...
}

main.js
describe(`${Pet.name} Class`, () => {
    let model;
    let mockPetService;

    beforeEach(() => {
        const data = {firstname: 'Coconut', lastname: 'Miles', breed:'Chihuahua', id:1}
        mockPetService = {
            lastId: null,
            user: {},
            getPetById(id) {
                this.lastId = id;
                return this.pet;
            }
        }

        model = new Pet(data, mockPetService);
    })

    describe('getFullPetData', () => {
        //arrange
        mockPetService.lastId = null;
        mockPetService.user = {firstname: 'Coconut', lastname: 'Miles', breed:'Chihuahua', id:1};

        //act
        const result = await model.getFullPetData();

        //assert
        expect(mockPetService.lastId).toBe(1);
    });
});

# toDefine and toEqual
pet.js
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
    ...
}

main.js
describe(`${Pet.name} Class`, () => {
    it('exists', () => {
        expect(Pet).toBeDefined();
    });

    let model;
    
    beforeEach(() => {
        model = new Pet();
    });

    describe('additions', () => {
        it('gets full name pieces', () => {
            //arrange
            const firstName = 'Cococnut';
            const lastName = 'Miles';
            const breed = 'Chihuahua';

            //act
            model = new Pet({firstName, lastName, breed});

            //assert
            expect(model.fullNamePieces).toEqual([firstName, lastName]);
        })
    });
});

# toMatch
pet.js is same

main.js
describe(`${Pet.name} Class`, () => {
    it('exists', () => {
        expect(Pet).toBeDefined();
    });

    let model;
    
    beforeEach(() => {
        model = new Pet();
    });

    describe('additions', () => {
        it('gets full name pieces', () => {
            //arrange
            const firstName = 'Coconut';
            const lastName = 'Miles';

            //act
            model = new Pet({firstName, lastName});

            //assert
            //checking to see if "Coconut" is in full name
            expect(model.fullName).toMatch(/Coconut/);
        })
    });
});
