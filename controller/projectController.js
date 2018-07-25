const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');


/*
 *Functions///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

/**
 * @param callback
 */
getAllProjects = callback => {
    Project.find(callback);
};


/**
 * @param id as input
 * @param callback project and err
 */
getProjectByID = (id, callback) => {
    const query = {_id: id};
    Project.findOne(query, callback);
};


/**
 * @param email as input
 * @param callback as projects
 */
getProjectsByMemberEmail = (email, callback) => {
    const query = {projectMembersEmail: email};
    Project.find(query, callback);
};

/**
 * @param title as input
 * @param callback as projects
 */
getProjectsByTitle = (title, callback) => {
    const query = {projectTitle: title};
    Project.find(query, callback);
};


/**
 * @param email as managers email
 * @param callback as Manager Projects and err
 */
getProjectsByManagerEmail = (email, callback) => {
    const query = {projectMangerEmail: email};
    Project.find(query, callback);
};


/**
 * @param id
 * @param callback as deleted project and err
 */
deleteProjectByID = (id, callback) => {
    const query = {_id: id};
    Project.findOneAndRemove(query, callback);
};


/**
 * @param newProject
 * @param callback
 */
saveProject = (newProject, callback) => {
    newProject.save(callback);
};


/**
 * @param email
 * @param update
 * @param callback
 */
updateUserByEmail = (email, update, callback) => {
    const query = {email: email};
    User.findOneAndUpdate(query,{$set:update}, callback);
};


/**
 * @param id
 * @param update
 * @param callback
 */
updateProjectByID = (id, update, callback) => {
    const query = {_id: id};
    Project.findOneAndUpdate(query,{$set:update}, callback);
};


/*
 * Routes////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

router.get("", (req, res) => {          //blank url means the root page(localhost:3000/project)
    res.send("Testing localhost:3000/project Respond");
});

/**
 * @param string username as req from front end
 * @param string password as req from front end
 * @return JSON as res  eg.data not inserted from saveProject
 */
router.post("/addproject", (req, res) => {
    //console.log(req.body);
    const newProject = new Project({            //here Project is from model
        projectTitle: req.body.projectTitle,
        projectStartDate:req.body.projectStartDate,
        projectDeadLine: req.body.projectDeadLine,
        projectMangerEmail: req.body.projectManger,
        projectDetails: req.body.projectDetails,
    });
    //console.log(newProject);
    saveProject(newProject, (err, project) => {
        if (err) {
            res.json({state: false, msg: 'project not inserted from saveProject'});
        }
        if (project) {
            res.json({state: true,project, msg: 'project inserted from saveProject'});
        }
    });
});

/**
 * input req.body.id
 * input req.body.projectTasks
 */
router.post("/addtask", (req, res) => {
    var i = 0;
    getProjectByID(req.body.id, (err, project) => {
        if (err) {
            console.log("getProjectByID Function Error: " + err);
            res.json({state: false, msg: 'getProjectByID Function Error'});
        }
        else {
            for (i; i < req.body.projectTasks.length; i++) {
                project.projectTasks.push(req.body.projectTasks[i]);
            }
            saveProject(project, (err, newProject) => {
                if (err) {
                    res.json({state: false, msg: 'Tasks not inserted from saveProject'});
                }
                if(newProject){
                    res.json({state: true, msg: 'Tasks inserted from saveProject'});
                }
            });
        }
    });
});


router.post("/addmembers", (req, res) => {
    var i = 0;
    getProjectByID(req.body.id, (err, project) => {
        if (err) {
            console.log("getProjectByID Function Error: " + err);
            res.json({state: false, msg: 'getProjectByID Function Error'});
        }
        else {

            for (i; i < req.body.projectMembersEmail.length; i++) {
                //console.log(i);
                //console.log(req.body.projectMembersEmail[i].email);
                project.projectMembersEmail.push(req.body.projectMembersEmail[i].email);

                const update={
                    projectCount:req.body.projectMembersEmail[i].projectCount
                };
                updateUserByEmail(req.body.projectMembersEmail[i].email,update, (err, updateduser) => {
                    if(err){
                        console.log("updateUserByEmail Function Error: " + err);
                    }
                    else {
                       // console.log(updateduser);
                    }
                });
            }
            saveProject(project, (err, newProject) => {
                if (err) {
                    res.json({state: false, msg: 'Members not inserted from saveProject'});
                }
                if(newProject){
                    res.json({state: true, msg: 'Members inserted from saveProject'});
                }
            });
        }
    });
});


router.post('/showprojectsbymanageremail', (req, res) => {
    getProjectsByManagerEmail(req.body.email, (err, projects) => {
        if (err) {
            console.log("getProjectsByManagerEmail Function Error: " + err);
        }
        else {
            res.json(projects);
        }
    });
});




router.get('/showallprojects', (req, res) => {
    getAllProjects((err,Projects) => {
        if (err) {
            console.log("getAllProjects Function Error: " + err);
        }
        else {
            res.json(Projects);
        }
    });
});



router.post('/getdatediffremainingdays', (req, res) => {

    var startDate =new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;


    var utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    var utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    var diff=Math.floor((utc2 - utc1) / _MS_PER_DAY);
    res.json(diff);
});



router.post('/participatoryprojects', (req, res) => {

    getProjectsByMemberEmail(req.body.email, (err, projects) => {
        if (err) {
            console.log("getProjectsByMemberEmail Function Error: " + err);
        }
        else {
            res.json(projects);
        }
    });
});


router.get('/searchprojectsbytitle/:title', (req, res) => {

    getProjectsByTitle(req.params.title, (err, projects) => {
        if (err) {
            console.log("getProjectsByTitle Function Error: " + err);
        }
        else {
            res.json(projects);
        }
    });
});


router.delete('/deleteprojectbyid', (req, res) => {
    deleteProjectByID(req.body.id, (err, deletedProject) => {
        if (err) {
            console.log("deleteProjectByID Function Error: " + err);
        }
        else {
            res.json(deletedProject);
        }
    });
});


router.put('/updateprojectdeadlinebyid/:_id', (req, res) => {
    const update = {
        projectDeadLine: req.body.projectDeadLine,
    };
    updateProjectByID(req.params._id, update, (err, updatedProject) => {
        if (err) {
            console.log("updateUserByEmail Function Error: " + err);
        }
        else {
            res.json({state: true,updatedProject, msg: 'Project Updated Successfully'});
        }
    });
});





module.exports = router;