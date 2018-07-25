import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';      //import this cuz we have to send data using http and application/json headers
import 'rxjs/add/operator/map';                 //import 'map' to get the backend's  json respond
import {tokenNotExpired} from 'angular2-jwt';     //Checking Authentication to Hide/Show Elements and Handle Routing see the doc at https://www.npmjs.com/package/angular2-jwt


@Injectable()
export class AuthService {

  authToken: any;

  constructor(
    private http: Http
  ) {
  }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/user/register", user, {headers: headers}).map(res => res.json());
  }

  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/user/login", user, {headers: headers}).map(res => res.json());
  }

  //store token in local storage
  storeData(token) {
    localStorage.setItem("tokenID", token);   //set backend's responds token to the local storage as tokenID (open chrome->application->Local Storage)
    this.authToken = token;         //set backend's responded token to this.authToken
  }

  //load the local storage's current token
  fetchToken() {
    const token = localStorage.getItem("tokenID");  //get current token from local storage and store to token variable
    this.authToken = token; //then current token assigned to authToken
  }


  /**
   * load the local storage's current token and pass it as Authorization header
   * then send a get request to localhost:3000/currentUser/profile
   */
  retreiveProfile() {

    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get("http://localhost:3000/user/profile", {headers: headers}).map(res => res.json());
  }

  //clear local storage data
  logOutUser() {
    this.authToken = null;
    localStorage.clear();
  }

  /**
   * The tokenNotExpired function can be used to check whether a JWT exists in local storage,
   * and if it does, whether it has expired or not. If the token is valid, tokenNotExpired returns true,
   * otherwise it returns false.
   */
  loggedIn() {
    return tokenNotExpired("tokenID");
  }


  createProject(project) {
    console.log("Accessed to createProject Function in authservice");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/project/addproject", project, {headers: headers}).map(res => res.json());
  }

  createTasks(task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/project/addtask", task, {headers: headers}).map(res => res.json());
  }

  createMembers(memData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/project/addmembers", memData, {headers: headers}).map(res => res.json());
  }

  retreiveAllUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get("http://localhost:3000/user/showallusers", {headers: headers}).map(res => res.json());
  }


  getProjectsByManagerEmail(pmEmail) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/project/showprojectsbymanageremail", pmEmail, {headers: headers}).map(res => res.json());
  }


  getProjectsByMemberEmail(mEmail) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/project/participatoryprojects", mEmail, {headers: headers}).map(res => res.json());
  }


  deleteUserByemail(email) {
    return this.http.delete("http://localhost:3000/user/deleteuserbyemail/" + email).map(res => res.json());
  }

  updateProjectDeadLineByProjectId(id, date) {
    return this.http.put("http://localhost:3000/project/updateprojectdeadlinebyid/" + id, date).map(res => res.json());
  }

  updateUserByEmail(updateprofiledetails) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:3000/user/updateprofile", updateprofiledetails, {headers: headers}).map(res => res.json());
  }


}
