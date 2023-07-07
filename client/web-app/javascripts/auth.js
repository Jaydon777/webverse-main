const { response } = require("express");

const login = (creds) => {
    return fetch("http://localhost:8000/api/v1/student/auth/login", {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Access the response data
        // Perform additional operations with the data
        // ...
        return data;
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error(error);
        return false;
      });
  };
  
  const loginWarden = (creds) => {
    return fetch("http://localhost:8000/api/v1/warden/auth/login", {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Access the response data
        // Perform additional operations with the data
        // ...
        return data;
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error(error);
        return false;
      });
  };

const signup = (creds) => {
    return fetch("http://localhost:8000/api/v1/student/auth/register", {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        return data["message"] === "Student Registered" ? true : false;
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error(error);
        return false;
      });
  };
  

module.exports = { login, signup, loginWarden};
