const chakram = require('chakram'),
    expect = chakram.expect;

describe("API Testing", () => {


    it("User should register",()=>{
       let user = {
           username: "DummyUserName",
           name: "DummyName",
           email: "DummyUserEmail@gmail.com",
           password: "123",
           role:"user",
           projectCount:0
       };
        var response = chakram.post("http://localhost:3000/user/register", user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("User should login", () => {
        let user = {
            email: "DummyUserEmail@gmail.com",
            password: "123"
        };
        var response = chakram.post("http://localhost:3000/user/login", user);
        expect(response).to.have.status(200);
        return chakram.wait();

    });

    it("Should return all users", () => {
        var response = chakram.get("http://localhost:3000/user/showallusers");
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should update currentUser's project count by id", () => {
        let user = {
            id: "5b222b63e5054702fc446499",
            projectCount: "10"
        };
        var response = chakram.put("http://localhost:3000/user/updateprojectcountbyid", user);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should return all projects", () => {
        var response = chakram.get("http://localhost:3000/project/showallprojects");
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should create a project", () => {
        let project = {
            projectTitle: "DummyProjectTitle",
            projectStartDate: "2017-06-18T00:00:00.000Z",
            projectDeadLine: "2018-06-18T00:00:00.000Z",
            projectManger: "tester@gmail.com",
            projectDetails: "bla blaa blaaa"
        };
        var response = chakram.post("http://localhost:3000/project/addproject", project);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should search projects by title", () => {
        var response = chakram.get("http://localhost:3000/project/searchprojectsbytitle/DummyProjectTitles");
        expect(response).to.have.status(200);
        return chakram.wait();
    });


    it("Should add tasks to project", () => {
        let task = {
            id: "5b2a1d231713b915409685de",            //open db and copy a available project id to test add dummy task
            projectTasks: [
                {
                    taskTitle: "DummyTaskTitle",
                    taskDeadLine: "2019-06-20T00:00:00.000Z",
                    taskStartDate: "2018-06-18T00:00:00.000Z",
                    taskDetails: "should be complete"
                }
            ]

        };
        var response = chakram.post("http://localhost:3000/project/addtask", task);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should delete a currentUser by id", () => {
        let id = {
            id: "5b228690ac4d532bdc7360af"
        };
        var response = chakram.delete("http://localhost:3000/user/deleteuserbyid", id);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Should delete a project by id ", () => {
        let id = {
            id: "5b2410c5cccc5821bc8f3e2b"
        };
        var response = chakram.delete("http://localhost:3000/project/deleteprojectbyid", id);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

});