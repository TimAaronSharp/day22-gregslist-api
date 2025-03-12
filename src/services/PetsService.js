import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"


class PetsService {
  async getAllPets() {
    const pets = await dbContext.Pets.find()
    return pets
  }
  async getPetsByQuery(petQuery) {
    const pageNumber = parseInt(petQuery.page) || 1
    const petLimit = 5
    const skipAmount = pageNumber * petLimit - petLimit
    delete petQuery.page

    const sortBy = petQuery.sort
    delete petQuery.sort
    const petsCount = await dbContext.Pets.countDocuments(petQuery)
    const totalPages = Math.ceil(petsCount / petLimit) || 1

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is greater than the total amount of pages (${totalPages}), you MORON!!!`)
    }

    const pets = await dbContext.Pets
      .find(petQuery)
      .limit(petLimit)
      .skip(skipAmount)
      .sort(sortBy)
      .populate('creator')

    const responseObj = {
      currentPage: pageNumber,
      pets: pets,
      totalPets: petsCount,
      totalPages: totalPages
    }
    return responseObj
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