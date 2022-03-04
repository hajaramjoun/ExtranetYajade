import { CONNREFUSED } from "dns";
import firebase from "firebase";
import config from '../config';


const stateInit = {
  count: 10,
  admin: false,
  application: [],
  appUser: [],
  docSolr: [],
  appsList: [],
  userList: [],
  isLoged: false,
  erreur401: true
};



export const YajadeActionTypes = {
  AddUser: "Yajade/AddUser",
  AddApp: "Yajade/AddApp",
  DeleteUser: "Yajade/DeleteUser",
  DeleteApp: "Yajade/DeleteApp",
  EditeUser: "Yajade/EditeUser",
  EditeApp: "Yajade/EditeApp",
  FormValidate: "Yajade/FormValidate",
  AddApplication: "Yajade/AddApplication",
  Logout: "Yajade/Logout",
  AddApplicationSolr: "Yajade/AddApplicationSolr,",
  // AddApplicationFirebase: "Yajade/AddApplicationFirebase",

  error404: "Yajade/error404",
  UpdateApp: "Yajade/UpdateApp",

};

export default (state = stateInit, action) => {
  let newUser;
  let newApp;
  let newAppsList;
  let newDocSolr;
  let newUserList;
  let newApplication;
  let newAppUser;
  let appfirebase;
  let userfirebase;

  switch (action.type) {
    case YajadeActionTypes.AddUser:
      console.log("Ajout");
      newUser = state.userList.concat([action.data]);
     
      // firebase.auth().createUserWithEmailAndPassword(action.data.email, action.data.password).then(() => {
      firebase.database().ref('users/' + (newUser.length - 1)).set(action.data, function (error) {
        if (error) {
       
          console.log("The write failed ")
        } else {
         
          console.log("Data saved successfully")
        }
      });


      /* })/*.catch(function (error) {
         //      // Handle Errors here.
         //      var errorCode = error.code;
         //      var errorMessage = error.message;
         //      // ...
         //      console.log(errorCode)
         //      console.log(errorMessage)
         //    });
         //    console.log(user)
 
       })*/

      return {
        ...state,
        userList: newUser,
      };

    case YajadeActionTypes.UpdateApp:
        

      firebase.database().ref().child("users").on('value', (snapshot) => {

        userfirebase = snapshot.val()
      });
      firebase.database().ref().child("app").on('value', (snapshot) => {

        appfirebase = snapshot.val()

      });
      console.log(userfirebase)
      console.log(appfirebase)
      return {
        ...state,
        userList: userfirebase, appsList: appfirebase,
      };

    

    case YajadeActionTypes.Logout:
      console.log("logout");
      return {
        ...state, isLoged: false

      };
    case YajadeActionTypes.AddApplication:
      console.log("list app sous reducer ");
      console.log(state.application);
      return {
        ...state,
        application: action.application,
      };
    case YajadeActionTypes.AddApplicationSolr:
      console.log("list app sous reducer ");
      console.log(state.application);
      return {
        ...state,
        docSolr: action.docSolr,
      };

    case YajadeActionTypes.AddApp:
      console.log("Ajout");
      newApp = state.appsList.concat([action.data]);

      return {
        ...state,
        appsList: newApp,
      };
    case YajadeActionTypes.FormValidate:
      console.log("login ismail")

      return {
        ...state, isLoged: true

      };

    case YajadeActionTypes.error404:
      console.log(state.erreur401);
      return {
        ...state, erreur401: true

      };
    case YajadeActionTypes.DeleteApp:
      newAppsList = state.appsList.filter(
        (_, index) => index !== action.index
      );
      return {
        ...state,
        appsList: newAppsList,
      };

    case YajadeActionTypes.DeleteUser:
      newUserList = state.userList.filter(
        (_, index) => index !== action.index
      );
      firebase.database().ref('/users').set(newUserList);

      return {
        ...state,
        userList: newUserList,
      };

    case YajadeActionTypes.EditeApp:
      state.appsList[action.id] = action.data
      return {
        ...state,
      };

    case YajadeActionTypes.EditeUser:
      console.log(action.id)
      console.log(state.userList[action.id])
      state.userList[action.id] = action.data
      firebase.database().ref('users/' + action.id).set(action.data, function (error) {
        if (error) {

          console.log("The write failed ")
        } else {

          console.log("Data saved successfully")
        }
      });
      return {
        ...state,
      };

    default:
      return state;
  }
}