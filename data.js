// Fallback quiz data and difficulty settings
const difficultySettings = {
  easy: {
    timeLimit: 30,
    baseScore: 10,
    speedBonus: 5,
    streakBonus: 2
  },
  medium: {
    timeLimit: 25,
    baseScore: 15,
    speedBonus: 8,
    streakBonus: 3
  },
  hard: {
    timeLimit: 20,
    baseScore: 20,
    speedBonus: 10,
    streakBonus: 5
  }
};

// Fallback quiz questions (used when API is unavailable)
const quizData = {
  general: {
    easy: [
      {
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"],
        explanation: "Paris is the capital and largest city of France."
      },
      {
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Venus", "Jupiter", "Saturn"],
        explanation: "Mars is called the Red Planet due to its reddish appearance."
      },
      {
        question: "What is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
      },
      {
        question: "Who painted the Mona Lisa?",
        correct_answer: "Leonardo da Vinci",
        incorrect_answers: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        explanation: "The Mona Lisa was painted by Italian artist Leonardo da Vinci."
      },
      {
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Ag", "Fe", "Cu"],
        explanation: "Au comes from the Latin word for gold, 'aurum'."
      }
    ],
    medium: [
      {
        question: "In which year did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1944", "1946", "1943"],
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
      },
      {
        question: "What is the largest desert in the world?",
        correct_answer: "Sahara Desert",
        incorrect_answers: ["Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        explanation: "The Sahara Desert is the largest hot desert in the world."
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        correct_answer: "William Shakespeare",
        incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"],
        explanation: "Romeo and Juliet was written by William Shakespeare."
      },
      {
        question: "What is the square root of 144?",
        correct_answer: "12",
        incorrect_answers: ["10", "14", "16"],
        explanation: "12 × 12 = 144, so the square root of 144 is 12."
      },
      {
        question: "Which country is home to the kangaroo?",
        correct_answer: "Australia",
        incorrect_answers: ["New Zealand", "South Africa", "Brazil"],
        explanation: "Kangaroos are native to Australia."
      }
    ],
    hard: [
      {
        question: "What is the speed of light in meters per second?",
        correct_answer: "299,792,458",
        incorrect_answers: ["199,792,458", "399,792,458", "249,792,458"],
        explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second."
      },
      {
        question: "Who discovered penicillin?",
        correct_answer: "Alexander Fleming",
        incorrect_answers: ["Louis Pasteur", "Robert Koch", "Joseph Lister"],
        explanation: "Alexander Fleming discovered penicillin in 1928."
      },
      {
        question: "What is the atomic number of carbon?",
        correct_answer: "6",
        incorrect_answers: ["5", "7", "8"],
        explanation: "Carbon has 6 protons, giving it an atomic number of 6."
      },
      {
        question: "In which year did the Berlin Wall fall?",
        correct_answer: "1989",
        incorrect_answers: ["1987", "1991", "1985"],
        explanation: "The Berlin Wall fell on November 9, 1989."
      },
      {
        question: "What is the largest organ in the human body?",
        correct_answer: "Skin",
        incorrect_answers: ["Heart", "Liver", "Brain"],
        explanation: "The skin is the largest organ in the human body."
      }
    ]
  },
  sports: {
    easy: [
      {
        question: "Which sport is known as 'The Beautiful Game'?",
        correct_answer: "Soccer",
        incorrect_answers: ["Basketball", "Tennis", "Golf"],
        explanation: "Soccer is often called 'The Beautiful Game'."
      },
      {
        question: "How many players are on a basketball team?",
        correct_answer: "5",
        incorrect_answers: ["6", "4", "7"],
        explanation: "A basketball team has 5 players on the court at a time."
      },
      {
        question: "What color are the Olympic rings?",
        correct_answer: "Blue, Yellow, Black, Green, Red",
        incorrect_answers: ["Red, White, Blue, Green, Yellow", "Blue, Red, Green, Yellow, Purple", "Black, White, Red, Blue, Green"],
        explanation: "The Olympic rings are blue, yellow, black, green, and red."
      },
      {
        question: "Which country has won the most FIFA World Cups?",
        correct_answer: "Brazil",
        incorrect_answers: ["Germany", "Argentina", "Italy"],
        explanation: "Brazil has won 5 FIFA World Cups, more than any other country."
      },
      {
        question: "What is the national sport of Japan?",
        correct_answer: "Sumo",
        incorrect_answers: ["Karate", "Judo", "Baseball"],
        explanation: "Sumo is considered the national sport of Japan."
      }
    ],
    medium: [
      {
        question: "In which year did the first modern Olympics take place?",
        correct_answer: "1896",
        incorrect_answers: ["1900", "1886", "1904"],
        explanation: "The first modern Olympic Games were held in Athens in 1896."
      },
      {
        question: "Who holds the record for most Grand Slam tennis titles?",
        correct_answer: "Margaret Court",
        incorrect_answers: ["Serena Williams", "Steffi Graf", "Martina Navratilova"],
        explanation: "Margaret Court holds the record with 24 Grand Slam titles."
      },
      {
        question: "What is the length of a marathon in kilometers?",
        correct_answer: "42.195",
        incorrect_answers: ["40", "45", "50"],
        explanation: "A marathon is exactly 42.195 kilometers (26.2 miles)."
      },
      {
        question: "Which NBA player has won the most championships?",
        correct_answer: "Bill Russell",
        incorrect_answers: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James"],
        explanation: "Bill Russell won 11 NBA championships with the Boston Celtics."
      },
      {
        question: "What is the fastest recorded speed of a tennis serve?",
        correct_answer: "163.7 mph",
        incorrect_answers: ["150 mph", "170 mph", "155 mph"],
        explanation: "The fastest recorded tennis serve is 163.7 mph by Sam Groth."
      }
    ],
    hard: [
      {
        question: "What is the 'Golden Slam' in tennis?",
        correct_answer: "Winning all four Grand Slams plus Olympic gold in the same year",
        incorrect_answers: ["Winning all four Grand Slams", "Winning Olympic gold", "Winning all Grand Slams plus Davis Cup"],
        explanation: "A Golden Slam is winning all four Grand Slams plus Olympic gold in the same calendar year."
      },
      {
        question: "Which country invented cricket?",
        correct_answer: "England",
        incorrect_answers: ["India", "Australia", "South Africa"],
        explanation: "Cricket originated in England in the 16th century."
      },
      {
        question: "What is the maximum score possible in a single bowling frame?",
        correct_answer: "30",
        incorrect_answers: ["20", "25", "35"],
        explanation: "The maximum score in a single frame is 30 (three strikes)."
      },
      {
        question: "In which year was the first FIFA World Cup held?",
        correct_answer: "1930",
        incorrect_answers: ["1926", "1934", "1928"],
        explanation: "The first FIFA World Cup was held in Uruguay in 1930."
      },
      {
        question: "What is the 'Triple Crown' in horse racing?",
        correct_answer: "Kentucky Derby, Preakness Stakes, Belmont Stakes",
        incorrect_answers: ["Kentucky Derby, Preakness Stakes, Breeders' Cup", "Kentucky Derby, Belmont Stakes, Breeders' Cup", "Preakness Stakes, Belmont Stakes, Breeders' Cup"],
        explanation: "The Triple Crown consists of the Kentucky Derby, Preakness Stakes, and Belmont Stakes."
      }
    ]
  },
  movies: {
    easy: [
      {
        question: "Who played Iron Man in the Marvel Cinematic Universe?",
        correct_answer: "Robert Downey Jr.",
        incorrect_answers: ["Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
        explanation: "Robert Downey Jr. played Tony Stark/Iron Man in the MCU."
      },
      {
        question: "What year did 'Titanic' win the Academy Award for Best Picture?",
        correct_answer: "1998",
        incorrect_answers: ["1997", "1999", "1996"],
        explanation: "Titanic won Best Picture at the 1998 Academy Awards."
      },
      {
        question: "Which actor played Jack Sparrow in 'Pirates of the Caribbean'?",
        correct_answer: "Johnny Depp",
        incorrect_answers: ["Orlando Bloom", "Geoffrey Rush", "Bill Nighy"],
        explanation: "Johnny Depp played Captain Jack Sparrow in the Pirates of the Caribbean series."
      },
      {
        question: "What is the name of the main character in 'Forrest Gump'?",
        correct_answer: "Forrest Gump",
        incorrect_answers: ["Tom Hanks", "Lieutenant Dan", "Bubba"],
        explanation: "The main character is named Forrest Gump, played by Tom Hanks."
      },
      {
        question: "Which movie features a character named Darth Vader?",
        correct_answer: "Star Wars",
        incorrect_answers: ["Star Trek", "The Matrix", "Blade Runner"],
        explanation: "Darth Vader is a character from the Star Wars franchise."
      }
    ],
    medium: [
      {
        question: "Who directed 'The Godfather'?",
        correct_answer: "Francis Ford Coppola",
        incorrect_answers: ["Martin Scorsese", "Steven Spielberg", "Quentin Tarantino"],
        explanation: "Francis Ford Coppola directed The Godfather in 1972."
      },
      {
        question: "What year was the first 'Jurassic Park' movie released?",
        correct_answer: "1993",
        incorrect_answers: ["1991", "1995", "1997"],
        explanation: "Jurassic Park was released in 1993 and directed by Steven Spielberg."
      },
      {
        question: "Which actress has won the most Academy Awards?",
        correct_answer: "Katharine Hepburn",
        incorrect_answers: ["Meryl Streep", "Ingrid Bergman", "Bette Davis"],
        explanation: "Katharine Hepburn won 4 Academy Awards for Best Actress."
      },
      {
        question: "What is the highest-grossing movie of all time (adjusted for inflation)?",
        correct_answer: "Gone with the Wind",
        incorrect_answers: ["Avatar", "Titanic", "Star Wars"],
        explanation: "Gone with the Wind is the highest-grossing movie when adjusted for inflation."
      },
      {
        question: "Who played the Joker in 'The Dark Knight'?",
        correct_answer: "Heath Ledger",
        incorrect_answers: ["Jared Leto", "Joaquin Phoenix", "Jack Nicholson"],
        explanation: "Heath Ledger played the Joker in The Dark Knight (2008)."
      }
    ],
    hard: [
      {
        question: "What was the first animated feature film to be nominated for Best Picture at the Oscars?",
        correct_answer: "Beauty and the Beast",
        incorrect_answers: ["Toy Story", "The Lion King", "Snow White"],
        explanation: "Beauty and the Beast (1991) was the first animated film nominated for Best Picture."
      },
      {
        question: "Which director has won the most Academy Awards for Best Director?",
        correct_answer: "John Ford",
        incorrect_answers: ["Steven Spielberg", "Martin Scorsese", "Alfred Hitchcock"],
        explanation: "John Ford won 4 Academy Awards for Best Director."
      },
      {
        question: "What year was the first 'Star Wars' movie released?",
        correct_answer: "1977",
        incorrect_answers: ["1975", "1979", "1981"],
        explanation: "Star Wars: Episode IV - A New Hope was released in 1977."
      },
      {
        question: "Which movie won the Palme d'Or at Cannes in 1994?",
        correct_answer: "Pulp Fiction",
        incorrect_answers: ["Forrest Gump", "The Shawshank Redemption", "The Lion King"],
        explanation: "Pulp Fiction won the Palme d'Or at the 1994 Cannes Film Festival."
      },
      {
        question: "What was the first movie to be rated PG-13?",
        correct_answer: "Red Dawn",
        incorrect_answers: ["Indiana Jones and the Temple of Doom", "Gremlins", "The Terminator"],
        explanation: "Red Dawn (1984) was the first movie to receive a PG-13 rating."
      }
    ]
  },
  science: {
    easy: [
      {
        question: "What is the hardest natural substance on Earth?",
        correct_answer: "Diamond",
        incorrect_answers: ["Steel", "Iron", "Platinum"],
        explanation: "Diamond is the hardest natural substance known on Earth."
      },
      {
        question: "What is the chemical symbol for water?",
        correct_answer: "H2O",
        incorrect_answers: ["CO2", "O2", "N2"],
        explanation: "H2O is the chemical formula for water (two hydrogen atoms, one oxygen atom)."
      },
      {
        question: "Which planet is closest to the Sun?",
        correct_answer: "Mercury",
        incorrect_answers: ["Venus", "Earth", "Mars"],
        explanation: "Mercury is the closest planet to the Sun in our solar system."
      },
      {
        question: "What is the largest organ in the human body?",
        correct_answer: "Skin",
        incorrect_answers: ["Heart", "Liver", "Brain"],
        explanation: "The skin is the largest organ in the human body."
      },
      {
        question: "What is the study of fossils called?",
        correct_answer: "Paleontology",
        incorrect_answers: ["Archaeology", "Geology", "Biology"],
        explanation: "Paleontology is the study of fossils and ancient life forms."
      }
    ],
    medium: [
      {
        question: "What is the atomic number of carbon?",
        correct_answer: "6",
        incorrect_answers: ["5", "7", "8"],
        explanation: "Carbon has 6 protons, giving it an atomic number of 6."
      },
      {
        question: "What is the speed of light in meters per second?",
        correct_answer: "299,792,458",
        incorrect_answers: ["199,792,458", "399,792,458", "249,792,458"],
        explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second."
      },
      {
        question: "What is the largest bone in the human body?",
        correct_answer: "Femur",
        incorrect_answers: ["Humerus", "Tibia", "Radius"],
        explanation: "The femur (thigh bone) is the largest and strongest bone in the human body."
      },
      {
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Ag", "Fe", "Cu"],
        explanation: "Au comes from the Latin word for gold, 'aurum'."
      },
      {
        question: "What is the study of earthquakes called?",
        correct_answer: "Seismology",
        incorrect_answers: ["Geology", "Meteorology", "Oceanography"],
        explanation: "Seismology is the study of earthquakes and seismic waves."
      }
    ],
    hard: [
      {
        question: "What is the Heisenberg Uncertainty Principle?",
        correct_answer: "It's impossible to know both the position and momentum of a particle with absolute certainty",
        incorrect_answers: ["Particles can exist in multiple states simultaneously", "Energy cannot be created or destroyed", "The speed of light is constant in all reference frames"],
        explanation: "The Heisenberg Uncertainty Principle states that the more precisely we know a particle's position, the less precisely we can know its momentum, and vice versa."
      },
      {
        question: "What is the largest known structure in the universe?",
        correct_answer: "Hercules-Corona Borealis Great Wall",
        incorrect_answers: ["Milky Way Galaxy", "Andromeda Galaxy", "Local Group"],
        explanation: "The Hercules-Corona Borealis Great Wall is the largest known structure in the observable universe."
      },
      {
        question: "What is the Planck constant?",
        correct_answer: "6.626 × 10^-34 joule-seconds",
        incorrect_answers: ["3.14159", "2.71828", "1.61803"],
        explanation: "The Planck constant (h) is approximately 6.626 × 10^-34 joule-seconds."
      },
      {
        question: "What is the study of the behavior of matter at the atomic and subatomic level called?",
        correct_answer: "Quantum Mechanics",
        incorrect_answers: ["Classical Mechanics", "Thermodynamics", "Electromagnetism"],
        explanation: "Quantum mechanics describes the behavior of matter at the atomic and subatomic level."
      },
      {
        question: "What is the largest prime number known as of 2023?",
        correct_answer: "2^82,589,933 - 1",
        incorrect_answers: ["2^77,232,917 - 1", "2^74,207,281 - 1", "2^57,885,161 - 1"],
        explanation: "As of 2023, the largest known prime number is 2^82,589,933 - 1, discovered in 2018."
      }
    ]
  }
};
