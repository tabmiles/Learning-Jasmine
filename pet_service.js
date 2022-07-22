class PetService {
    getPetById(id){
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    }
}