export function selectTruck(truck) {
  console.log("You clicked " + truck.name);

  return {
    type: "truck selected",
    payload: truck
  };
};