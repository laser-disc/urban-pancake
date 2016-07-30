// this is the storage for whatever truck was selected out of the trucks list
//this function's job is to listen for the selectTruck action

export default function (state=null, action) {
  switch(action.type){
    case "truck selected":
      return action.payload;
      break;
    };
    return state;
};