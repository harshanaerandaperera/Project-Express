export interface Deadlinetask {
  projectTitle:String,
  projectTasks:[{
    taskTitle:String,
    taskStartDate:Date,
    taskDeadLine:Date,
    taskDetails:String,
  }]

}
