import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";



export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('', this.getAllPets)
      .get('/search', this.getPetsByQuery)
      .get('/:petId', this.getPetById)
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getAllPets(req, res, next) {
    try {
      const pets = await petsService.getAllPets()
      res.send()
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getPetsByQuery(req, res, next) {
    try {
      const petQuery = req.query
      const pets = await petsService.getPetsByQuery(petQuery)
      res.send()
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getPetById(req, res, next) {
    try {
      const petId = req.params.petId
      const pet = await petsService.getPetById(petId)
      res.send()
    } catch (error) {
      next(error)
    }
  }
}