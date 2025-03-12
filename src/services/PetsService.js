import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"


class PetsService {
  async getAllPets() {
    const pets = await dbContext.Pets.find()
    return pets
  }
  async getPetsByQuery(petQuery) {

  }
  async getPetById(petId) {
    const pet = await dbContext.Pets.findById(petId)

    if (pet == null) {
      throw new BadRequest(`${petId} is not a valid pet id, you MORON!!!`)
    }
    return pet
  }

}

export const petsService = new PetsService()