import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";


export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAllJobs)
      .get('/search', this.getJobsByQuery)
      .get('/:jobId', this.getJobById)
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
  /**
       * @param {import("express").Request} req
       * @param {import("express").Response} res
       * @param {import("express").NextFunction} next
       */
  async getJobsByQuery(req, res, next) {
    try {
      const jobQuery = req.query
      const jobs = await jobsService.getJobsByQuery(jobQuery)
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  /**
       * @param {import("express").Request} req
       * @param {import("express").Response} res
       * @param {import("express").NextFunction} next
       */
  async getJobById(req, res, next) {
    try {
      const jobId = req.params.jobId
      const job = await jobsService.getJobById(jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
}