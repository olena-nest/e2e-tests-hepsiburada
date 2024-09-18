import axios, { AxiosResponse } from 'axios';

const baseURL = 'https://petstore.swagger.io/v2';

interface Pet {
    id: number;
    name: string;
    status: string;
}

describe('Pet API CRUD Operations', () => {
    let petId: number;

    it('should create a new pet [POST /pet]', async () => {
        const newPet: Pet = {
            id: Math.floor(Math.random() * 1000000),
            name: 'Rex',
            status: 'available',
        };

        const response: AxiosResponse<Pet> = await axios.post(`${baseURL}/pet`, newPet);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(newPet.id);
        expect(response.data.name).toBe(newPet.name);
        expect(response.data.status).toBe(newPet.status);

        // Save petId for future tests
        petId = response.data.id;
    });

    it('should retrieve the pet by ID [GET /pet/{petId}]', async () => {
        const response: AxiosResponse<Pet> = await axios.get(`${baseURL}/pet/${petId}`);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(petId);
        expect(response.data.name).toBe('Rex');
        expect(response.data.status).toBe('available');
    });

    it('should update the pet status [PUT /pet]', async () => {
        const updatedPet: Pet = {
            id: petId,
            name: 'Rex',
            status: 'sold',
        };

        const response: AxiosResponse<Pet> = await axios.put(`${baseURL}/pet`, updatedPet);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(updatedPet.id);
        expect(response.data.name).toBe(updatedPet.name);
        expect(response.data.status).toBe(updatedPet.status);
    });

    it('should delete the pet by ID [DELETE /pet/{petId}]', async () => {
        const response: AxiosResponse = await axios.delete(`${baseURL}/pet/${petId}`);
        expect(response.status).toBe(200);

        // Confirm the pet has been deleted
        await expect(axios.get(`${baseURL}/pet/${petId}`)).rejects.toThrow('Request failed with status code 404');
    });

    // Negative Scenario: Attempt to get a pet that does not exist
    it('should return 404 when retrieving a non-existent pet [GET /pet/{petId}]', async () => {
        const nonExistentPetId = 123456789;

        await expect(axios.get(`${baseURL}/pet/${nonExistentPetId}`)).rejects.toThrow('Request failed with status code 404');
    });

    // Negative Scenario: Attempt to create a pet with invalid data
    it('should return 400 when creating a pet with invalid data [POST /pet]', async () => {
        const invalidPetData = {
            id: 'invalid-id', // Invalid ID, should be a number
            name: 12345, // Invalid name, should be a string
            status: 'invalid-status', // Status is not one of the allowed values
        };

        await expect(axios.post(`${baseURL}/pet`, invalidPetData)).rejects.toThrow('Request failed with status code 400');
    });
});
