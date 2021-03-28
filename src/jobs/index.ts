import ExampleJob from 'jobs/ExampleJob'

function initialJobs() {
  // Example Jobs
  const getExampleTask = ExampleJob.getExample()
  getExampleTask.start()

  // Other Jobs
}

export default initialJobs
