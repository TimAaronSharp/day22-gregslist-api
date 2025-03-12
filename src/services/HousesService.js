import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"


class HousesService {
  async getAllHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHousesByQuery(houseQuery) {
    const pageNumber = parseInt(houseQuery.page) || 1
    const houseLimit = 5
    const skipAmount = pageNumber * houseLimit - houseLimit

    delete houseQuery.page

    const sortBy = houseQuery.sort
    delete houseQuery.sort

    const housesCount = await dbContext.Houses.countDocuments(houseQuery)
    const totalPages = Math.ceil(housesCount / houseLimit) || 1

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is greater than the total amount of pages (${totalPages}), you MORON!!!`)
    }

    const houses = await dbContext.Houses
      .find(houseQuery)
      .limit(houseLimit)
      .skip(skipAmount)
      .sort(sortBy)
      .populate('creator')

    const responseObj = {
      currentPage: pageNumber,
      houses: houses,
      totalHouses: housesCount,
      totalPages: totalPages
    }

    return responseObj
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