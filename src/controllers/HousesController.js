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
  getHouseById(req, res, next) {
    try {
      res.send('🏠 GREAT id success!')
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  getHousesByQuery(req, res, next) {
    try {
      res.send('🏠 GREAT query success!')
    } catch (error) {
      next(error)
    }
  }
}