const mongoose=require('mongoose');
const schema=mongoose.Schema;

const projectSchema=new schema({
    projectTitle:{type:String,required:true},
    projectStartDate:{type:Date,required:true},
    projectDeadLine:{type:Date,required:true},
    projectMangerEmail:{type:String},
    projectDetails:{type:String},
    projectMembersEmail:[String],
    projectTasks:[{
        taskTitle:String,
        taskStartDate:Date,
        taskDeadLine:Date,
        taskDetails:String,
    }],
});

module.exports=mongoose.model("Project",projectSchema);

