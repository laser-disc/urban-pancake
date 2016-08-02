import axios from 'axios';

export function selectTruck(truck) {
  console.log("You clicked " + truck.name);
    const url = '/API/fetch';
    axios.get(url, {
        params: {
          handle: truck.handle
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("just making sure", error);
      });

  return {
    type: "truck selected",
    payload: truck
  };

};