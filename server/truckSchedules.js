// LIST OF FOOD TRUCKS & EVENTS IN REQUEST-HANDLER
// TODO need to accomodate truckEvents...
const foodEvents = ['gloungesf', 'otgsf', 'SPARKsocialSF', 'mvblfeast', 'somastreatfoodpark', 'truckstopSF'];


module.exports.truckEvents = {
  "G Food Lounge": [
    /*sunday:*/ {closed: true},
    /*monday:*/ {closed: false, trucks: []},
    /*tuesday:*/ {closed: false, trucks: []},
    /*wednesday:*/ {closed: false, trucks: ['Curry Up Now', 'Red Sauce Meatballs', 'Beyond The Border SF', 'Sunrise Deli', 'LittleRedRidingTruck']},
    /*thursday:*/ {closed: false, trucks: []},
    /*friday:*/ {closed: false, trucks: []},
    /*saturday:*/ {closed: true},
  ]
}

module.exports.truckSchedules = {
  "Curry Up Now": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37.790841, lng: -122.401280, closed: false},
    /*tuesday:*/ {lat: 37.790841, lng: -122.401280, closed: false},
    /*wednesday:*/ {lat: 37.790841, lng: -122.401280, closed: false},
    /*thursday:*/ {lat: 37.790841, lng: -122.401280, closed: false},
    /*friday:*/ {lat: 37.790841, lng: -122.401280, closed: false},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "Fins on the Hoof": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37., lng: -122., closed: true},
    /*tuesday:*/ {lat: 37., lng: -122., closed: true},
    /*wednesday:*/ {lat: 37., lng: -122., closed: true},
    /*thursday:*/ {lat: 37., lng: -122., closed: true},
    /*friday:*/ {lat: 37., lng: -122., closed: true},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "Sam's ChowderMobile": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37., lng: -122., closed: true},
    /*tuesday:*/ {lat: 37., lng: -122., closed: true},
    /*wednesday:*/ {lat: 37., lng: -122., closed: true},
    /*thursday:*/ {lat: 37., lng: -122., closed: true},
    /*friday:*/ {lat: 37., lng: -122., closed: true},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "Kokio Republic": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37.799696, lng: -122.400083, closed: false},
    /*tuesday:*/ {lat: 37.779992, lng: -122.413782, closed: false},
    /*wednesday:*/ {lat: 37., lng: -122., closed: true},
    /*thursday:*/ {lat: 37.769769, lng: -122.412049, closed: false},
    /*friday:*/ {lat: 37.782314, lng: -122.405963, closed: false},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "The Chairman Truck": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37.783703, lng: -122.394377, closed: false},
    /*tuesday:*/ {lat: 37.790135, lng: -122.397464, closed: false},
    /*wednesday:*/ {lat: 37.782314, lng: -122.405963, closed: false},
    /*thursday:*/ {lat: 37.770798, lng: -122.391602, closed: false},
    /*friday:*/ {lat: 37.767417, lng: -122.390322, closed: false},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "JapaCurry": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37.793079, lng: -122.401164, closed: false},
    /*tuesday:*/ {lat: 37.789159, lng: -122.395882, closed: false},
    /*wednesday:*/ {lat: 37.789159, lng: -122.395882, closed: false},
    /*thursday:*/ {lat: 37.787447, lng: -122.400520, closed: false},
    /*friday:*/ {lat: 37.793079, lng: -122.401164, closed: false},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
  "The Slider Shack": [
    /*sunday:*/ {lat: 37., lng: -122., closed: true},
    /*monday:*/ {lat: 37., lng: -122., closed: true},
    /*tuesday:*/ {lat: 37.774929, lng: -122.419416, closed: false},
    /*wednesday:*/ {lat: 37., lng: -122., closed: true},
    /*thursday:*/ {lat: 37.788556, lng: -122.396031, closed: false},
    /*friday:*/ {lat: 37.788556, lng: -122.396031, closed: false},
    /*saturday:*/ {lat: 37., lng: -122., closed: true},
  ],
}
