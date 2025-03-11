import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";



class JobsService {
  async getAllJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }
  async getJobsByQuery(jobQuery) {

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