// src/data.js
export const roadmap = [
  {
    id: 1,
    title: "Module 1: Road Signs",
    isLocked: false,
    lessons: [
      { 
        id: 1.1, 
        title: "Regulatory Signs", 
        image: "/images/regulatory_sign.png",
        paragraphs: [
          "Regulatory signs communicate the laws you must follow. Failure to comply isn't just a safety hazard; it's a legal violation.",
          "Most are rectangular with white backgrounds and black lettering. The famous exceptions are the octagonal STOP sign (red) and the triangular YIELD sign.",
          "When you see a STOP sign, you must come to a complete halt before the stop line. A 'rolling stop' is illegal and dangerous."
        ],
        miniQuiz: [
          { q: "What is the primary purpose of Regulatory Signs?", options: ["Give directions", "Communicate laws", "Warn of hazards", "Point to parks"], a: "Communicate laws" },
          { q: "Which of these is a famous exception to the rectangular rule?", options: ["Speed Limit", "One Way", "STOP sign", "No Parking"], a: "STOP sign" },
          { q: "Where must you stop if there is a stop line?", options: ["After the line", "Before the line", "On the line", "Wherever you want"], a: "Before the line" }
        ]
      },
      { 
        id: 1.2, 
        title: "Warning Signs", 
        image: "/images/road-warning-signs.webp",
        paragraphs: [
          "Warning signs alert you to potentially hazardous conditions. These are almost always yellow and diamond-shaped with black symbols.",
          "They prepare you to slow down for conditions ahead like merge areas, slippery roads, or upcoming signals.",
          "Special pentagon-shaped signs indicate School Zones. You must watch for children, as fines are often doubled in these areas."
        ],
        miniQuiz: [
          { q: "What shape are most Warning Signs?", options: ["Circle", "Square", "Diamond", "Rectangle"], a: "Diamond" },
          { q: "What color background do standard warning signs have?", options: ["White", "Red", "Yellow", "Green"], a: "Yellow" },
          { q: "What shape is a School Zone sign?", options: ["Triangle", "Pentagon", "Octagon", "Diamond"], a: "Pentagon" }
        ]
      },
      { 
        id: 1.3, 
        title: "Informative Signs", 
        image: "/images/informative-signs.png",
        paragraphs: [
          "Informative (or Guide) signs provide directional and mileage information to help you identify your route quickly.",
          "Green signs indicate destinations and directions. Blue signs indicate motorist services like hospitals or gas stations.",
          "Brown signs point to cultural interest or parks. Reading these in advance prevents dangerous, sudden lane changes."
        ],
        miniQuiz: [
          { q: "What do Green informative signs indicate?", options: ["Services", "Parks", "Directions", "Laws"], a: "Directions" },
          { q: "What color is used for motorist services like hospitals?", options: ["Green", "Blue", "Brown", "Yellow"], a: "Blue" },
          { q: "Brown signs are reserved for what?", options: ["Speed limits", "Construction", "Cultural interest", "Hazards"], a: "Cultural interest" }
        ]
      },
      { 
        id: 1.4, 
        title: "Pavement Markings", 
        image: "/images/pavement-markings.png",
        paragraphs: [
          "Lines painted on the road divide lanes and tell you when you may safely pass or change lanes.",
          "Yellow lines separate traffic moving in opposite directions. A solid double yellow line means no passing is allowed.",
          "White lines separate traffic moving in the same direction. Broken white lines mean you may change lanes; solid white lines mean stay in your lane."
        ],
        miniQuiz: [
          { q: "What do yellow lines separate?", options: ["Same direction traffic", "Opposite direction traffic", "Bike lanes", "Shoulders"], a: "Opposite direction traffic" },
          { q: "What does a solid double yellow line mean?", options: ["Pass with care", "No passing allowed", "One way street", "Speed up"], a: "No passing allowed" },
          { q: "A broken white line indicates what?", options: ["Stay in lane", "May change lanes", "Stop ahead", "Wrong way"], a: "May change lanes" }
        ]
      },
      { 
        id: 1.5, 
        title: "Traffic Lights", 
        image: "/images/traffic-light.png",
        paragraphs: [
          "Traffic lights control the flow of traffic at intersections using three standard colors: Red, Yellow, and Green.",
          "Red means stop. A flashing red is treated as a stop sign. Yellow warns the signal is turning red; stop if it is safe to do so.",
          "Green means go if clear. A green arrow provides a 'protected' turn, meaning oncoming traffic is stopped for you."
        ],
        miniQuiz: [
          { q: "A flashing red light should be treated as a:", options: ["Yield sign", "Green light", "Stop sign", "Warning"], a: "Stop sign" },
          { q: "What does a green arrow indicate?", options: ["Stop", "Yield", "Protected turn", "Unprotected turn"], a: "Protected turn" },
          { q: "When a light turns yellow, you should:", options: ["Speed up", "Stop if safe", "Always stop", "Honk"], a: "Stop if safe" }
        ]
      }
    ],
    midQuiz: [
      { q: "Which sign shape is exclusively for STOP?", options: ["Square", "Circle", "Octagon", "Triangle"], a: "Octagon" },
      { q: "Yellow diamond signs represent:", options: ["Laws", "Information", "Warnings", "Directions"], a: "Warnings" },
      { q: "Blue rectangular signs indicate:", options: ["Speed limits", "Motorist services", "Parks", "Construction"], a: "Motorist services" },
      { q: "Double solid yellow lines mean:", options: ["Passing allowed", "No passing", "One way traffic", "Lane ends"], a: "No passing" },
      { q: "A green arrow at a light means:", options: ["Yield to oncoming", "Stop immediately", "Protected turn", "Pedestrians only"], a: "Protected turn" }
    ],
    status: "not_started"
  },
  {
    id: 2,
    title: "Module 2: Traffic Laws",
    isLocked: true,
    lessons: [
      { 
        id: 2.1, 
        title: "Right of Way at Intersections", 
        image: "/images/right-of-way-at-intersections.png",
        paragraphs: [
          "Right-of-way rules provide a structured way for vehicles to navigate intersections. At a four-way stop, the general rule is 'first to arrive, first to go.'",
          "If two vehicles arrive at the exact same time, the vehicle on the left must yield to the vehicle on the right.",
          "In roundabouts, traffic already inside the circle has the right of way; entering vehicles must yield to their left."
        ],
        miniQuiz: [
          { q: "At a four-way stop, what is the general rule?", options: ["Fastest car goes first", "First to arrive, first to go", "Yield to trucks", "Wait for a green light"], a: "First to arrive, first to go" },
          { q: "If two cars arrive at a stop at the same time, who yields?", options: ["The vehicle on the right", "The vehicle on the left", "The faster vehicle", "The vehicle turning right"], a: "The vehicle on the left" },
          { q: "In a roundabout, who has the right of way?", options: ["Vehicles entering", "Vehicles already inside", "Vehicles on the right", "Nobody"], a: "Vehicles already inside" }
        ]
      },
      { 
        id: 2.2, 
        title: "Speed Limits and Basic Speed Law", 
        image: "/images/speed-limit.png",
        paragraphs: [
          "The 'Basic Speed Law' states that you should never drive faster than is safe for current conditions, regardless of the posted limit.",
          "Driving at the limit during heavy rain or fog can still result in a ticket if it is considered unsafe.",
          "School zones often have lower limits (15-25 MPH) during specific hours to protect children."
        ],
        miniQuiz: [
          { q: "What does the 'Basic Speed Law' state?", options: ["Always drive 55 MPH", "Drive at the posted limit only", "Never drive faster than is safe for conditions", "Speed limits don't apply at night"], a: "Never drive faster than is safe for conditions" },
          { q: "Speeding is a factor in roughly how many fatal crashes?", options: ["10%", "One-third", "Half", "90%"], a: "One-third" },
          { q: "Why are school zone speed limits strictly enforced?", options: ["To collect fines", "To protect children", "Because roads are narrower", "To prevent noise"], a: "To protect children" }
        ]
      },
      { 
        id: 2.3, 
        title: "DUI and Impaired Driving", 
        image: "/images/dui.png",
        paragraphs: [
          "Driving Under the Influence (DUI) is a serious offense. Alcohol and drugs impair judgment, coordination, and reaction time.",
          "In most states, 0.08% is the BAC limit for adults. For those under 21, 'Zero Tolerance' laws apply.",
          "Consequences include heavy fines, mandatory jail time, and license revocation."
        ],
        miniQuiz: [
          { q: "What is the standard legal BAC limit for adults?", options: ["0.01%", "0.05%", "0.08%", "0.10%"], a: "0.08%" },
          { q: "What do 'Zero Tolerance' laws mean for drivers under 21?", options: ["No speeding", "Any detectable alcohol is an arrest", "No night driving", "Need a co-signer"], a: "Any detectable alcohol is an arrest" },
          { q: "Which can cause impairment?", options: ["Alcohol only", "Illegal drugs only", "Alcohol, drugs, and some prescriptions", "Only red-label meds"], a: "Alcohol, drugs, and some prescriptions" }
        ]
      },
      { 
        id: 2.4, 
        title: "Parking Regulations and Curb Colors", 
        image: "/images/curb-color.png",
        paragraphs: [
          "Red curbs mean no stopping or parking. White is for short-term passenger drop-off. Blue is reserved for disabled placards.",
          "Never park within 15 feet of a fire hydrant. When parking uphill with a curb, turn wheels away from the curb."
        ],
        miniQuiz: [
          { q: "What does a red curb indicate?", options: ["Loading", "Disabled", "No stopping/parking", "Drop-off"], a: "No stopping/parking" },
          { q: "Distance to park from a fire hydrant?", options: ["5 ft", "10 ft", "15 ft", "50 ft"], a: "15 ft" },
          { q: "Parking uphill with a curb, turn wheels:", options: ["Toward curb", "Away from curb", "Straight", "Doesn't matter"], a: "Away from curb" }
        ]
      },
      { 
        id: 2.5, 
        title: "Emergency Vehicles and Move-Over Laws", 
        image: "/images/emergency.png",
        paragraphs: [
          "Immediately yield to emergency vehicles with sirens by pulling over to the right and stopping.",
          "Move Over laws require changing lanes away from stopped emergency vehicles on highways to protect first responders."
        ],
        miniQuiz: [
          { q: "Action when sirens approach?", options: ["Speed up", "Stop in lane", "Pull right and stop", "Hazards only"], a: "Pull right and stop" },
          { q: "Approach an emergency vehicle in an intersection:", options: ["Stop", "Back up", "Clear then pull over", "Honk"], a: "Clear then pull over" },
          { q: "Purpose of Move Over laws?", options: ["Traffic flow", "Protect first responders", "Allow police speed", "Lane-change test"], a: "Protect first responders" }
        ]
      }
    ],
    midQuiz: [
      { q: "In a roundabout, who has the right of way?", options: ["Entering vehicles", "Vehicles already inside", "The largest vehicle", "Pedestrians only"], a: "Vehicles already inside" },
      { q: "What is the 'Basic Speed Law'?", options: ["Always 65 MPH", "Limits are optional", "Never faster than safe for conditions", "Highway only"], a: "Never faster than safe for conditions" }
    ],
    status: "locked"
  },
  {
    id: 3,
    title: "Module 3: Road Safety & Ethics",
    isLocked: true,
    lessons: [
      {
        id: 3.1,
        title: "Defensive Driving and SIPDE",
        image: "/images/defensive-driving.png",
        paragraphs: [
          "Defensive driving focuses on saving lives and time despite conditions. SIPDE stands for Search, Identify, Predict, Decide, and Execute.",
          "Maintain a 'space cushion' by following the three-second rule in good weather, increasing it during poor visibility.",
          "Keeping space around your vehicle provides an 'out' or escape path during sudden hazards."
        ],
        miniQuiz: [
          { q: "What does the 'S' in SIPDE stand for?", options: ["Stop", "Search", "Signal", "Slow"], a: "Search" },
          { q: "What is the recommended following distance in good conditions?", options: ["1 second", "3 seconds", "10 seconds", "No set rule"], a: "3 seconds" },
          { q: "MATCH: (1) Predict, (2) Identify, (3) Execute.", options: ["1-Maneuver, 2-Hazard, 3-Guess", "1-Guess, 2-Hazard, 3-Maneuver", "1-Hazard, 2-Guess, 3-Maneuver"], a: "1-Guess, 2-Hazard, 3-Maneuver" },
          { q: "The purpose of an 'out' is:", options: ["Exiting", "Escape path", "Passing", "Parking"], a: "Escape path" },
          { q: "SCENARIO: A car is tailgating you. Do you:", options: ["Slam brakes", "Slow down to let them pass", "Speed up", "Ignore"], a: "Slow down to let them pass" }
        ]
      },
      {
        id: 3.2,
        title: "Driving in Adverse Conditions",
        image: "/images/adverse-conditions.png",
        paragraphs: [
          "The road is slickest during the first few minutes of rain. Hydroplaning occurs when water builds up under tires.",
          "In fog, always use low-beam headlights. High beams reflect off moisture and reduce visibility.",
          "If hydroplaning, ease off the gas and steer straight—avoid slamming on the brakes."
        ],
        miniQuiz: [
          { q: "When is the road slickest during rain?", options: ["After 2 hours", "The first few minutes", "When it stops", "Only in winter"], a: "The first few minutes" },
          { q: "Which lights should you use in thick fog?", options: ["High beams", "Low beams", "Parking lights", "Interior"], a: "Low beams" },
          { q: "MATCH: (1) Fog, (2) Night Glare, (3) Rain Start.", options: ["1-Low Beams, 2-Fog Line, 3-Oil Slick", "1-High Beams, 2-Center Line, 3-Dry", "1-Low Beams, 2-Center Line, 3-Hydroplane"], a: "1-Low Beams, 2-Fog Line, 3-Oil Slick" },
          { q: "Action for hydroplaning?", options: ["Brake", "Turn sharply", "Ease off gas/steer straight", "Accelerate"], a: "Ease off gas/steer straight" },
          { q: "SCENARIO: Visibility is zero in fog. Do you:", options: ["Speed up", "Pull off safely and wait", "High beams", "Follow car close"], a: "Pull off safely and wait" }
        ]
      },
      {
        id: 3.3,
        title: "Pedestrian and Cyclist Safety",
        image: "/images/bicycle-accident.png",
        paragraphs: [
          "Always yield to pedestrians in crosswalks, marked or unmarked. Leave at least three feet of space when passing cyclists.",
          "Do not honk at cyclists as it may cause them to fall. Always check blind spots before turning right."
        ],
        miniQuiz: [
          { q: "Required space when passing a cyclist?", options: ["1 foot", "3 feet", "5 feet", "10 feet"], a: "3 feet" },
          { q: "Where must you yield to pedestrians?", options: ["Marked only", "Night only", "Marked and unmarked", "Nowhere"], a: "Marked and unmarked" },
          { q: "MATCH: (1) Passing, (2) Right Turn, (3) Crosswalk.", options: ["1-3ft, 2-Check Blindspot, 3-Yield", "1-Yield, 2-3ft, 3-Check Blindspot", "1-Check Blindspot, 2-Yield, 3-3ft"], a: "1-3ft, 2-Check Blindspot, 3-Yield" },
          { q: "Why not honk at a cyclist?", options: ["Illegal", "Startle/cause fall", "Can't hear", "Horns fail"], a: "Startle/cause fall" },
          { q: "SCENARIO: Pedestrian crosses against sign. Do you:", options: ["Honk", "Yield regardless", "Swerve", "Call police"], a: "Yield regardless" }
        ]
      },
      {
        id: 3.4,
        title: "Sharing the Road with Large Trucks",
        image: "/images/Share-the-Road.webp",
        paragraphs: [
          "Trucks have 'No-Zones' (blind spots). If you can't see the driver's face in their mirrors, they can't see you.",
          "Trucks require longer distances to stop. Avoid cutting in front of a truck and braking.",
          "Trucks often swing left before making a wide right turn—never squeeze between them and the curb."
        ],
        miniQuiz: [
          { q: "What is a 'No-Zone'?", options: ["Exit", "Truck blind spot", "Parking", "Weigh station"], a: "Truck blind spot" },
          { q: "How to know if a truck driver sees you?", options: ["See mirror", "See face in mirror", "See tires", "Can't"], a: "See face in mirror" },
          { q: "MATCH: (1) Front, (2) Sides, (3) Behind truck.", options: ["1-No-Zone, 2-No-Zone, 3-No-Zone", "1-Safe, 2-No-Zone, 3-Safe", "1-No-Zone, 2-Safe, 3-Safe"], a: "1-No-Zone, 2-No-Zone, 3-No-Zone" },
          { q: "Trucks swing left to turn right because:", options: ["Confused", "Wide turning berth", "Lost", "Check mirrors"], a: "Wide turning berth" },
          { q: "CRITICAL: Beside a truck signaling right. Do you:", options: ["Speed up", "Squeeze in", "Wait behind", "Honk"], a: "Wait behind" }
        ]
      },
      {
        id: 3.5,
        title: "Road Ethics and Avoiding Road Rage",
        image: "/images/road-rage.webp",
        paragraphs: [
          "Be courteous and predictable: use signals, dim high beams, and don't linger in the left lane.",
          "If you encounter road rage, avoid eye contact and give space. If threatened, drive to a police or fire station, not home."
        ],
        miniQuiz: [
          { q: "What is 'camping' in the left lane?", options: ["Parking", "Staying in passing lane slowly", "Speeding", "Tailgating"], a: "Staying in passing lane slowly" },
          { q: "If threatened by road rage, go to:", options: ["Home", "Alley", "Police/Public place", "Friend's"], a: "Police/Public place" },
          { q: "MATCH: (1) Courtesy, (2) Frustration, (3) Safety.", options: ["1-Signals, 2-Road Rage, 3-Police Station", "1-Road Rage, 2-Signals, 3-Police Station", "1-Police Station, 2-Signals, 3-Road Rage"], a: "1-Signals, 2-Road Rage, 3-Police Station" },
          { q: "Handle aggressive drivers by:", options: ["Yell back", "Avoid eye contact/give space", "Brake check", "Record"], a: "Avoid eye contact/give space" },
          { q: "SCENARIO: Cut off by a driver. Do you:", options: ["Brake-check back", "Deep breath/increase distance", "High beams", "Follow"], a: "Deep breath/increase distance" }
        ]
      }
    ],
    midQuiz: [
      { q: "SIPDE process starts with:", options: ["Execute", "Search", "Identify", "Decide"], a: "Search" },
      { q: "Why use low beams in fog?", options: ["Power save", "High beams reflect/blind", "Brighter", "Wet weather only"], a: "High beams reflect/blind" },
      { q: "Minimum passing distance for cyclists?", options: ["1ft", "3ft", "5ft", "10ft"], a: "3ft" },
      { q: "If you can't see truck mirrors:", options: ["Safe", "They can't see you", "They are turning", "Speed up"], a: "They can't see you" },
      { q: "MATCH: (1) Search, (2) Identify, (3) Predict.", options: ["1-Scan, 2-Hazard, 3-Guess", "1-Guess, 2-Scan, 3-Hazard", "1-Hazard, 2-Guess, 3-Scan"], a: "1-Scan, 2-Hazard, 3-Guess" }
    ],
    status: "locked"
  }
];