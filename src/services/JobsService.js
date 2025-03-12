import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";



class JobsService {
  async getAllJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }
  async getJobsByQuery(jobQuery) {
    const pageNumber = parseInt(jobQuery.page) || 1
    const jobLimit = 5
    const skipAmount = pageNumber * jobLimit - jobLimit

    delete jobQuery.page

    const sortBy = jobQuery.sort
    delete jobQuery.sort

    const jobsCount = await dbContext.Jobs.countDocuments(jobQuery)
    const totalPages = Math.ceil(jobsCount / jobLimit) || 1

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is greater than the total amount of pages (${totalPages}), you MORON!!!`)
    }

    const jobs = await dbContext.Jobs
      .find(jobQuery)
      .limit(jobLimit)
      .skip(skipAmount)
      .sort(sortBy)
      .populate('creator')

    const responseObj = {
      currentPage: pageNumber,
      jobs: jobs,
      totalJobs: jobsCount,
      totalPages: totalPages
    }
    return responseObj
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)

    if (job == null) {
      throw new BadRequest(`${jobId} is not a valid job id, you MORON!!!`)
    }
    return job
  }
}

export const jobsService = new JobsService()