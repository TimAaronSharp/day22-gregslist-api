import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";


export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAllJobs)
  }
  /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
  async getAllJobs(req, res, next) {
    try {
      const jobs = await jobsService.getAllJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }

  }

}