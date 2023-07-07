const fetchStudentData = (authToken) => {
    return fetch("http://localhost:8000/api/v1/student/me", {
      headers: {
        "Authorization": `Bearer ${authToken}` // Include the authToken in the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message === "success" && data.data) {
          return {
            name: data.data.name,
            regNo: data.data.regNo,
            roomNo: data.data.roomNo,
            block: data.data.block,
            messType: data.data.messType,
          };
        } else {
          // Handle error or invalid response
          console.log("Invalid response from API");
          return null;
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.error("Failed to fetch data from API:", error);
        return null;
      });
  };
  
  module.exports = {
    fetchStudentData
  };
  