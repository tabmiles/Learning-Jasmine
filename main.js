//Test Suite

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
            expect(model.fullName).toMatch(/Coconut/);
        })
    });
});