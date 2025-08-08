// Quiz Data - Questions organized by category and difficulty
const quizData = {
    general: {
        easy: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
                explanation: "Paris is the capital and largest city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                explanation: "Mars is called the Red Planet due to its reddish appearance."
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correct: 3,
                explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2,
                explanation: "The Mona Lisa was painted by Leonardo da Vinci in the 16th century."
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Ag", "Au", "Fe", "Cu"],
                correct: 1,
                explanation: "Au comes from the Latin word 'aurum' meaning gold."
            }
        ],
        medium: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                correct: 2,
                explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
            },
            {
                question: "What is the largest desert in the world?",
                options: ["Sahara Desert", "Antarctic Desert", "Arabian Desert", "Gobi Desert"],
                correct: 1,
                explanation: "The Antarctic Desert is the largest desert, covering 14.2 million square kilometers."
            },
            {
                question: "Which country is home to the kangaroo?",
                options: ["New Zealand", "Australia", "South Africa", "India"],
                correct: 1,
                explanation: "Kangaroos are native to Australia and are a national symbol."
            },
            {
                question: "What is the main component of the sun?",
                options: ["Liquid lava", "Molten iron", "Hot gases", "Solid rock"],
                correct: 2,
                explanation: "The sun is primarily composed of hydrogen and helium gases."
            },
            {
                question: "How many continents are there on Earth?",
                options: ["5", "6", "7", "8"],
                correct: 2,
                explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
            }
        ],
        hard: [
            {
                question: "What is the speed of light in a vacuum?",
                options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
                correct: 0,
                explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second."
            },
            {
                question: "Which ancient wonder was located in Alexandria?",
                options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis", "Hanging Gardens"],
                correct: 1,
                explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
            },
            {
                question: "What is the largest organ in the human body?",
                options: ["Heart", "Liver", "Skin", "Brain"],
                correct: 2,
                explanation: "The skin is the largest organ, covering about 20 square feet in adults."
            },
            {
                question: "In which year was the first iPhone released?",
                options: ["2005", "2006", "2007", "2008"],
                correct: 2,
                explanation: "The first iPhone was released by Apple in 2007."
            },
            {
                question: "What is the chemical formula for water?",
                options: ["H2O2", "H2O", "CO2", "NaCl"],
                correct: 1,
                explanation: "Water is composed of two hydrogen atoms and one oxygen atom (H2O)."
            }
        ]
    },
    sports: {
        easy: [
            {
                question: "Which sport is known as 'the beautiful game'?",
                options: ["Basketball", "Soccer", "Tennis", "Baseball"],
                correct: 1,
                explanation: "Soccer (football) is often called 'the beautiful game'."
            },
            {
                question: "How many players are on a basketball court at once?",
                options: ["8", "10", "12", "14"],
                correct: 1,
                explanation: "There are 5 players per team, so 10 total players on the court."
            },
            {
                question: "Which country has won the most Olympic medals?",
                options: ["Soviet Union", "United States", "China", "Germany"],
                correct: 1,
                explanation: "The United States has won the most Olympic medals in history."
            },
            {
                question: "What is the national sport of Japan?",
                options: ["Karate", "Sumo", "Judo", "Kendo"],
                correct: 1,
                explanation: "Sumo wrestling is considered Japan's national sport."
            },
            {
                question: "In tennis, what is a score of zero called?",
                options: ["Love", "Zero", "Nil", "None"],
                correct: 0,
                explanation: "In tennis, a score of zero is called 'love'."
            }
        ],
        medium: [
            {
                question: "Which country has won the most FIFA World Cups?",
                options: ["Germany", "Argentina", "Brazil", "Italy"],
                correct: 2,
                explanation: "Brazil has won 5 FIFA World Cup titles, more than any other country."
            },
            {
                question: "What is the length of a marathon?",
                options: ["26.2 miles", "13.1 miles", "50 kilometers", "100 kilometers"],
                correct: 0,
                explanation: "A marathon is exactly 26.2 miles (42.195 kilometers)."
            },
            {
                question: "Which NBA player has won the most championships?",
                options: ["Michael Jordan", "Bill Russell", "Kareem Abdul-Jabbar", "LeBron James"],
                correct: 1,
                explanation: "Bill Russell won 11 NBA championships with the Boston Celtics."
            },
            {
                question: "What is the fastest recorded serve in tennis?",
                options: ["150 mph", "160 mph", "170 mph", "180 mph"],
                correct: 1,
                explanation: "The fastest recorded tennis serve is 163.7 mph by Sam Groth."
            },
            {
                question: "Which country invented cricket?",
                options: ["Australia", "India", "England", "South Africa"],
                correct: 2,
                explanation: "Cricket originated in England in the 16th century."
            }
        ],
        hard: [
            {
                question: "What is the 'Golden Slam' in tennis?",
                options: ["Winning all 4 Grand Slams", "Winning all 4 Grand Slams + Olympic Gold", "Winning 3 Grand Slams in one year", "Winning Wimbledon 5 times"],
                correct: 1,
                explanation: "A Golden Slam is winning all 4 Grand Slams plus Olympic gold in the same year."
            },
            {
                question: "Which country has the most Olympic gold medals in swimming?",
                options: ["Australia", "United States", "Germany", "China"],
                correct: 1,
                explanation: "The United States has won the most Olympic gold medals in swimming."
            },
            {
                question: "What is the highest score possible in a single game of bowling?",
                options: ["200", "250", "300", "350"],
                correct: 2,
                explanation: "A perfect game in bowling is 300 points (12 consecutive strikes)."
            },
            {
                question: "Which Formula 1 driver has won the most championships?",
                options: ["Michael Schumacher", "Lewis Hamilton", "Ayrton Senna", "Alain Prost"],
                correct: 1,
                explanation: "Lewis Hamilton and Michael Schumacher are tied with 7 championships each."
            },
            {
                question: "What is the 'Triple Crown' in horse racing?",
                options: ["Kentucky Derby, Preakness, Belmont", "Grand National, Kentucky Derby, Melbourne Cup", "Kentucky Derby, Epsom Derby, Prix de l'Arc", "Belmont, Preakness, Grand National"],
                correct: 0,
                explanation: "The Triple Crown consists of the Kentucky Derby, Preakness Stakes, and Belmont Stakes."
            }
        ]
    },
    movies: {
        easy: [
            {
                question: "Who played Iron Man in the Marvel Cinematic Universe?",
                options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
                correct: 1,
                explanation: "Robert Downey Jr. played Tony Stark/Iron Man in the MCU."
            },
            {
                question: "What is the highest-grossing movie of all time?",
                options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars: The Force Awakens"],
                correct: 1,
                explanation: "Avatar (2009) is the highest-grossing movie of all time."
            },
            {
                question: "Which movie won Best Picture at the 2020 Oscars?",
                options: ["Parasite", "Joker", "1917", "Once Upon a Time in Hollywood"],
                correct: 0,
                explanation: "Parasite became the first foreign-language film to win Best Picture."
            },
            {
                question: "Who directed the movie 'Titanic'?",
                options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
                correct: 1,
                explanation: "James Cameron directed Titanic, which won 11 Academy Awards."
            },
            {
                question: "What is the name of the main character in 'Forrest Gump'?",
                options: ["Forrest Gump", "Tom Hanks", "Bubba", "Lieutenant Dan"],
                correct: 0,
                explanation: "Forrest Gump is the title character played by Tom Hanks."
            }
        ],
        medium: [
            {
                question: "Which actor has won the most Academy Awards for Best Actor?",
                options: ["Daniel Day-Lewis", "Jack Nicholson", "Tom Hanks", "Denzel Washington"],
                correct: 0,
                explanation: "Daniel Day-Lewis has won 3 Academy Awards for Best Actor."
            },
            {
                question: "What year was the first Star Wars movie released?",
                options: ["1975", "1976", "1977", "1978"],
                correct: 2,
                explanation: "Star Wars: A New Hope was released in 1977."
            },
            {
                question: "Which movie features the quote 'Here's looking at you, kid'?",
                options: ["Gone with the Wind", "Casablanca", "The Godfather", "Citizen Kane"],
                correct: 1,
                explanation: "This famous quote is from Casablanca, spoken by Humphrey Bogart."
            },
            {
                question: "Who played the Joker in 'The Dark Knight'?",
                options: ["Jared Leto", "Heath Ledger", "Joaquin Phoenix", "Jack Nicholson"],
                correct: 1,
                explanation: "Heath Ledger played the Joker and won a posthumous Oscar for his performance."
            },
            {
                question: "Which movie won the first Academy Award for Best Picture?",
                options: ["Wings", "The Jazz Singer", "Sunrise", "Metropolis"],
                correct: 0,
                explanation: "Wings won the first Academy Award for Best Picture in 1929."
            }
        ],
        hard: [
            {
                question: "What is the longest movie ever made?",
                options: ["Gone with the Wind", "Lawrence of Arabia", "The Cure for Insomnia", "Logistics"],
                correct: 2,
                explanation: "The Cure for Insomnia (1987) is 87 hours long, making it the longest movie."
            },
            {
                question: "Which director has the most Oscar nominations?",
                options: ["Steven Spielberg", "Martin Scorsese", "William Wyler", "Alfred Hitchcock"],
                correct: 2,
                explanation: "William Wyler has the most Oscar nominations for Best Director with 12."
            },
            {
                question: "What was the first animated movie to be nominated for Best Picture?",
                options: ["Beauty and the Beast", "Toy Story", "Up", "The Lion King"],
                correct: 0,
                explanation: "Beauty and the Beast (1991) was the first animated film nominated for Best Picture."
            },
            {
                question: "Which movie has the most Academy Award nominations?",
                options: ["All About Eve", "Titanic", "La La Land", "The Shape of Water"],
                correct: 0,
                explanation: "All About Eve (1950) holds the record with 14 Oscar nominations."
            },
            {
                question: "What is the highest-grossing R-rated movie of all time?",
                options: ["Deadpool", "Joker", "The Matrix Reloaded", "American Sniper"],
                correct: 1,
                explanation: "Joker (2019) is the highest-grossing R-rated movie with over $1 billion worldwide."
            }
        ]
    },
    science: {
        easy: [
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Steel", "Diamond", "Granite", "Iron"],
                correct: 1,
                explanation: "Diamond is the hardest natural substance known to man."
            },
            {
                question: "What is the chemical symbol for oxygen?",
                options: ["Ox", "O", "O2", "Oxg"],
                correct: 1,
                explanation: "O is the chemical symbol for oxygen."
            },
            {
                question: "Which planet is closest to the Sun?",
                options: ["Venus", "Mercury", "Earth", "Mars"],
                correct: 1,
                explanation: "Mercury is the closest planet to the Sun."
            },
            {
                question: "What is the largest organ in the human body?",
                options: ["Heart", "Liver", "Skin", "Brain"],
                correct: 2,
                explanation: "The skin is the largest organ, covering about 20 square feet."
            },
            {
                question: "What is the study of fossils called?",
                options: ["Archaeology", "Paleontology", "Geology", "Biology"],
                correct: 1,
                explanation: "Paleontology is the study of fossils and ancient life."
            }
        ],
        medium: [
            {
                question: "What is the speed of sound in air?",
                options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
                correct: 0,
                explanation: "The speed of sound in air is approximately 343 meters per second."
            },
            {
                question: "Which element has the atomic number 1?",
                options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
                correct: 1,
                explanation: "Hydrogen has atomic number 1, meaning it has 1 proton."
            },
            {
                question: "What is the largest type of whale?",
                options: ["Blue Whale", "Humpback Whale", "Sperm Whale", "Killer Whale"],
                correct: 0,
                explanation: "The Blue Whale is the largest animal known to have ever existed."
            },
            {
                question: "What is the process by which plants make their own food?",
                options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
                correct: 1,
                explanation: "Photosynthesis is the process by which plants convert sunlight into energy."
            },
            {
                question: "What is the study of earthquakes called?",
                options: ["Meteorology", "Seismology", "Volcanology", "Geology"],
                correct: 1,
                explanation: "Seismology is the scientific study of earthquakes and seismic waves."
            }
        ],
        hard: [
            {
                question: "What is the Heisenberg Uncertainty Principle?",
                options: ["You can't measure position and momentum simultaneously", "You can't observe without affecting the system", "Quantum particles are always in superposition", "Time and energy are inversely related"],
                correct: 0,
                explanation: "The Heisenberg Uncertainty Principle states that you cannot simultaneously know both the position and momentum of a particle with absolute precision."
            },
            {
                question: "What is the largest known structure in the universe?",
                options: ["Milky Way Galaxy", "Local Group", "Hercules-Corona Borealis Great Wall", "Sloan Great Wall"],
                correct: 2,
                explanation: "The Hercules-Corona Borealis Great Wall is the largest known structure in the observable universe."
            },
            {
                question: "What is the half-life of Carbon-14?",
                options: ["5,730 years", "4,730 years", "6,730 years", "3,730 years"],
                correct: 0,
                explanation: "Carbon-14 has a half-life of approximately 5,730 years."
            },
            {
                question: "What is the smallest unit of life?",
                options: ["Atom", "Cell", "Molecule", "Organelle"],
                correct: 1,
                explanation: "The cell is the smallest unit of life that can replicate independently."
            },
            {
                question: "What is the temperature of absolute zero in Celsius?",
                options: ["-273.15°C", "-273.16°C", "-273.14°C", "-273.17°C"],
                correct: 0,
                explanation: "Absolute zero is -273.15°C, the lowest possible temperature."
            }
        ]
    }
};

// Difficulty settings
const difficultySettings = {
    easy: {
        timeLimit: 30,
        baseScore: 10,
        bonusMultiplier: 1.5,
        streakBonus: 2
    },
    medium: {
        timeLimit: 25,
        baseScore: 15,
        bonusMultiplier: 2,
        streakBonus: 3
    },
    hard: {
        timeLimit: 20,
        baseScore: 20,
        bonusMultiplier: 2.5,
        streakBonus: 5
    }
};
