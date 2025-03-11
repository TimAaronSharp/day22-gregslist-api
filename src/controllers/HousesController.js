import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";



export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAllHouses)
      .get('/search', this.getHousesByQuery)
      .get('/:houseId', this.getHouseById)
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */

  async getAllHouses(req, res, next) {
    try {
      const houses = await housesService.getAllHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
  */
  async getHousesByQuery(req, res, next) {
    try {
      const houseQuery = req.query
      const houses = await housesService.getHousesByQuery(houseQuery)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.houseId
      const house = await housesService.getHouseById(houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
}