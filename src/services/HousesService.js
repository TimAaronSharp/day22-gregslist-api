import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"


class HousesService {
  async getAllHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHousesByQuery(houseQuery) {
    const sortBy = houseQuery.sort
    delete houseQuery.sort
    const houses = await dbContext.Houses.find(houseQuery).sort(sortBy)
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (house == null) {
      throw new BadRequest(`${houseId} is not a valid house id, you MORON!!!`)
    }
    return house
  }
}

export const housesService = new HousesService()