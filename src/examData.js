// src/examData.js
export const finalExamData = [
  // --- SECTION 1: SIGN IDENTIFICATION SPRINT ---
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Red Octagon.", 
    options: ["Yield", "Stop", "No Entry", "Warning"], 
    a: "Stop", 
    critical: true 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Yellow Diamond.", 
    options: ["Information", "Regulatory", "Warning", "Service"], 
    a: "Warning" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY COLOR: Blue Background.", 
    options: ["Directional", "Motorist Service", "Construction", "Parks"], 
    a: "Motorist Service" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Inverted Triangle.", 
    options: ["Stop", "Yield", "School Zone", "No Passing"], 
    a: "Yield", 
    critical: true 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Pentagon.", 
    options: ["Stop", "Railroad", "School Zone", "County Route"], 
    a: "School Zone" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY COLOR: Orange Background.", 
    options: ["Warning", "Construction", "Regulatory", "Information"], 
    a: "Construction" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Round Yellow with 'X'.", 
    options: ["No Entry", "Railroad Crossing", "Dead End", "One Way"], 
    a: "Railroad Crossing" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Pennant (Sideways Triangle).", 
    options: ["Yield", "No Passing Zone", "Sharp Turn", "Dead End"], 
    a: "No Passing Zone" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY SHAPE: Rectangle (Vertical).", 
    options: ["Warning", "Regulatory/Law", "Guide", "Service"], 
    a: "Regulatory/Law" 
  },
  { 
    type: "sprint", 
    q: "IDENTIFY COLOR: Brown Background.", 
    options: ["State Highway", "Construction", "Cultural/Parks", "Hospital"], 
    a: "Cultural/Parks" 
  },

  // --- SECTION 2: KNOWLEDGE & RULES ---
  {
    q: "MATCH CURB COLORS TO LAWS",
    options: [
      "Red: No Stopping, White: Loading, Blue: Disabled", 
      "Red: Parking, White: No Stopping", 
      "Blue: Loading, Red: Disabled"
    ],
    a: "Red: No Stopping, White: Loading, Blue: Disabled",
    critical: true,
    type: "knowledge"
  },
  { 
    type: "knowledge", 
    q: "MATCH THE HAND SIGNALS:", 
    options: [
      "Straight: Left, Up: Right, Down: Stop",
      "Straight: Right, Up: Left, Down: Stop",
      "Straight: Stop, Up: Right, Down: Left"
    ],
    a: "Straight: Left, Up: Right, Down: Stop"
  },

  // --- SECTION 3: SPATIAL REASONING ---
  { 
    type: "spatial", 
    q: "SPATIAL: Four vehicles arrive at a 4-way stop simultaneously. Which vehicle has priority?", 
    image: "/images/4way_stop_sim.png", 
    options: ["The vehicle on the right", "The fastest vehicle", "The vehicle on the left", "The vehicle going straight"], 
    a: "The vehicle on the right",
    critical: true 
  },
  { 
    type: "spatial", 
    q: "SPATIAL: In this roundabout, Car A is entering and Car B is already inside. Who yields?", 
    image: "/images/roundabout_yield.png", 
    options: ["Car A yields to Car B", "Car B yields to Car A", "Both stop", "Car A accelerates"], 
    a: "Car A yields to Car B" 
  },
  { 
    type: "spatial", 
    q: "SPATIAL: You are turning left at a green light (no arrow). Oncoming traffic is going straight. You must:", 
    image: "/images/left_turn_spatial.png", 
    options: ["Turn immediately", "Yield to oncoming traffic", "Honk and turn", "Stop and wait for red"], 
    a: "Yield to oncoming traffic" 
  },

  // --- SECTION 4: HAZARD PERCEPTION ---
  { 
    type: "hazard", 
    q: "HAZARD TRIAL: A ball rolls into the street from behind a parked car. What is the most likely secondary hazard?", 
    image: "/images/hazard_ball.jpg", 
    options: ["A child running after it", "A dog barking", "A flat tire", "Nothing else"], 
    a: "A child running after it",
    timer: 5 
  },
  { 
    type: "hazard", 
    q: "HAZARD TRIAL: A parked car's brake lights just turned on and the front wheels are turned toward the street. You should:", 
    image: "/images/hazard_parked_car.jpg", 
    options: ["Speed up to pass", "Prepare for the car to pull out", "Honk at the driver", "Ignore it"], 
    a: "Prepare for the car to pull out",
    timer: 5 
  },

  // --- SECTION 5: TACTICAL SCENARIOS ---
  { 
    q: "SCENARIO: You are driving 55mph and your front tire blows out. What is your NEXT move?", 
    options: ["Brake hard immediately", "Firmly grip wheel and stay straight", "Swerve to the shoulder", "Shift to Neutral"], 
    a: "Firmly grip wheel and stay straight",
    critical: true 
  },
  { 
    q: "SCENARIO: A school bus is stopped on a 2-lane road with red lights flashing. You are approaching from the front. You must:", 
    options: ["Pass slowly at 15mph", "Stop until the lights stop flashing", "Only stop if kids are in the road", "Honk and proceed"], 
    a: "Stop until the lights stop flashing",
    critical: true 
  },
  { 
    q: "SCENARIO: You are being tailgated on a high-speed highway. The safest tactical response is:", 
    options: ["Brake check them", "Increase following distance to car ahead", "Speed up significantly", "Stop in your lane"], 
    a: "Increase following distance to car ahead" 
  },
  { 
    q: "SCENARIO: You are entering a freeway. The merging lane is short and traffic is heavy. You should:", 
    options: ["Stop and wait for a gap", "Match the speed of traffic and merge", "Force your way in", "Drive on the shoulder"], 
    a: "Match the speed of traffic and merge" 
  },
  { 
    q: "SCENARIO: You feel your car 'floating' on a wet road (hydroplaning). You should:", 
    options: ["Slam on the brakes", "Ease off the gas and steer straight", "Turn the wheel sharply", "Accelerate through it"], 
    a: "Ease off the gas and steer straight" 
  },
  { 
    q: "SCENARIO: You are stopped at a red light. An emergency vehicle with sirens approaches from behind. You should:", 
    options: ["Stay put if you'd enter the intersection on red", "Move into the intersection to clear the path", "Turn right immediately", "Back up"], 
    a: "Stay put if you'd enter the intersection on red" 
  },
  { 
    q: "SCENARIO: Your accelerator pedal sticks while driving at high speed. Your FIRST action is:", 
    options: ["Turn off the engine", "Shift to Neutral", "Pull the emergency brake", "Jump out"], 
    a: "Shift to Neutral" 
  },
  { 
    q: "SCENARIO: You are driving at night and an oncoming car has high beams on. You should look toward:", 
    options: ["The center of the road", "The oncoming lights", "The right edge/fog line of your lane", "Close your eyes"], 
    a: "The right edge/fog line of your lane" 
  },
  { 
    q: "SCENARIO: A pedestrian begins crossing against the 'Don't Walk' signal while you have a green light. You:", 
    options: ["Honk and keep going", "Yield to the pedestrian", "Swerve around them", "Call 911 immediately"], 
    a: "Yield to the pedestrian" 
  },
  { 
    q: "SCENARIO: You see a 'Wrong Way' sign ahead on an off-ramp. Your immediate reaction is:", 
    options: ["Stop and reverse", "Pull over and turn around immediately", "Keep going to find a driveway", "Speed up"], 
    a: "Pull over and turn around immediately",
    critical: true 
  },

  // --- GENERAL KNOWLEDGE ---
  { q: "What is the BAC limit for a driver under 21?", options: ["0.08%", "0.05%", "Any detectable amount", "0.01%"], a: "Any detectable amount", critical: true },
  { q: "Following distance in heavy rain should be:", options: ["3 seconds", "1 second", "6 seconds or more", "No change"], a: "6 seconds or more" },
  { q: "When can you pass on a double solid yellow line?", options: ["Never", "When car ahead is slow", "To turn into a driveway", "During the day"], a: "To turn into a driveway" },
  { q: "Parking distance from a fire hydrant?", options: ["5 ft", "10 ft", "15 ft", "20 ft"], a: "15 ft" },
  { q: "Uphill parking with a curb, wheels should face:", options: ["Toward curb", "Away from curb", "Straight", "Left"], a: "Away from curb" },
  { q: "The 'No-Zone' of a truck is:", options: ["Safe zone", "The blind spot", "The passing lane", "The fuel tank"], a: "The blind spot" },
  { q: "You must signal how many feet before a turn?", options: ["50 ft", "100 ft", "200 ft", "500 ft"], a: "100 ft" },
  { q: "A 'Blind Spot' is checked by:", options: ["Looking in mirrors", "Turning your head", "Using cameras", "Honking"], a: "Turning your head" },
  { q: "Which of these is considered 'Distracted Driving'?", options: ["Checking mirrors", "Using a phone", "Scanning the road", "Checking speed"], a: "Using a phone" },
  { q: "Carbon Monoxide from your car is dangerous because:", options: ["It smells bad", "It is invisible and odorless", "It is brightly colored", "It is heavy"], a: "It is invisible and odorless" },
  { q: "When two lanes merge, you should use the:", options: ["Speed merge", "Zipper merge", "Stop merge", "Shoulder merge"], a: "Zipper merge" },
  { q: "Roads are most slippery when:", options: ["It has rained for hours", "It first starts raining", "It is dry", "The sun is out"], a: "It first starts raining" },
  { q: "A 'Protected' turn at a light is indicated by:", options: ["A green circle", "A green arrow", "A yellow light", "A flashing red"], a: "A green arrow" },
  { q: "If your brakes fail, your first move is to:", options: ["Jump out", "Downshift to a lower gear", "Turn off the engine", "Pull the parking brake hard"], a: "Downshift to a lower gear" },
  { q: "The '3-Second Rule' helps you maintain:", options: ["Speed", "Reaction time", "Safe following distance", "Fuel economy"], a: "Safe following distance" },
  { q: "When a school bus is loading children, you must stop at least:", options: ["5 ft away", "20 ft away", "100 ft away", "Just behind it"], a: "20 ft away" },
  { q: "Driving at night requires:", options: ["High beams always", "Increased following distance", "Faster speeds", "Sunglasses"], a: "Increased following distance" },
  { q: "If you miss your exit on a highway:", options: ["Reverse on the shoulder", "U-turn at the median", "Proceed to the next exit", "Stop and wait"], a: "Proceed to the next exit" },
  { q: "A flashing yellow light means:", options: ["Stop", "Speed up", "Proceed with caution", "Yield to all"], a: "Proceed with caution" },
  { q: "When sharing the road with a motorcycle:", options: ["Drive closer to them", "Give them the full lane width", "Honk to let them know you're there", "Share their lane"], a: "Give them the full lane width" },
  { q: "If a driver is acting aggressively, you should:", options: ["Engage them", "Avoid eye contact and give space", "Follow them", "Brake check them"], a: "Avoid eye contact and give space" },
  { q: "Your legal responsibility after a collision is to:", options: ["Drive away if no damage", "Stop and exchange information", "Call your parents only", "Hide the car"], a: "Stop and exchange information" },
  { q: "White lane lines separate:", options: ["Opposite traffic", "Same direction traffic", "Bike lanes", "Shoulders"], a: "Same direction traffic" },
  { q: "Defensive driving means:", options: ["Being aggressive", "Anticipating the mistakes of others", "Driving as fast as possible", "Never looking at mirrors"], a: "Anticipating the mistakes of others" }
];