import { dbContext } from "../db/DbContext.js";



class JobsService {
  async getAllJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }
}

export const jobsService = new JobsService()