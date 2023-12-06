"use server";

import {
  Concert,
  MallType,
  Nightlife,
  Review,
  SeatType,
  Shopping,
  Sports,
  TEntertainment,
  TEventQuery,
  TSportEvent,
  Theatre
} from "@/types/Event";
import {
  TConcertQuery,
  TNightlifeQuery,
  TShoppingQuery,
  TSportsQuery,
  TTheatreQuery
} from "@/types/query";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import {
  Atmosphere,
  Clubs,
  Concerts,
  Deals,
  DressCode,
  Drinks,
  Music,
  Sales,
  StoreNames
} from "./constants";
import {
  getRandom,
  openingHours,
  randomList,
  roundedFloat,
  showTimes
} from "./utils";

export const findEntertainment = async ({
  ...props
}: TEventQuery<"Entertainment">): Promise<TEntertainment[] | null> => {
  const { type: mode, params } = props;

  switch (mode) {
    case "Theatre":
      return findTheatre(params as TTheatreQuery);

    case "Concert":
      return findConcert(params as TConcertQuery);

    case "Sports":
      return findSports(params as TSportsQuery<TSportEvent>);

    case "Nightlife":
      return findNightlife(params as TNightlifeQuery);

    case "Shopping":
      return findShopping(params as TShoppingQuery);

    default:
      return null;
  }
};

export const customerReviews = async (
  stores: readonly string[] | string[]
) => {
  const names = [
    "John Doe",
    "Jane Doe",
    "John Smith",
    "Jane Smith",
    "James Smith",
    "James Doe",
    "Michael Smith",
    "Michael Doe",
    "Robert Smith",
    "Robert Doe",
    "William Smith",
    "William Doe",
    "David Smith",
    "David Doe",
    "Richard Smith",
    "Richard Doe",
    "Joseph Smith",
    "Joseph Doe",
    "Thomas Smith",
    "Thomas Doe",
    "Charles Smith",
    "Charles Doe",
    "Christopher Smith",
    "Christopher Doe",
    "Daniel Smith",
    "Daniel Doe",
    "Matthew Smith",
    "Matthew Doe",
    "Anthony Smith",
    "Anthony Doe",
    "Donald Smith",
    "Donald Doe",
    "Mark Smith",
    "Mark Doe",
    "Paul Smith",
    "Paul Doe",
    "Steven Smith",
    "Steven Doe",
    "Andrew Smith",
    "Andrew Doe",
    "Kenneth Smith",
    "Kenneth Doe",
    "Joshua Smith",
    "Joshua Doe",
    "Kevin Smith",
    "Kevin Doe",
    "Brian Smith",
    "Brian Doe",
    "George Smith",
    "George Doe",
    "Edward Smith",
    "Edward Doe",
    "Ronald Smith",
    "Ronald Doe",
    "Timothy Smith",
    "Timothy Doe",
    "Jason Smith",
    "Jason Doe",
    "Jeffrey Smith",
    "Jeffrey Doe",
    "Ryan Smith",
    "Ryan Doe",
    "Jacob Smith",
    "Jacob Doe",
    "Gary Smith",
    "Gary Doe",
    "Nicholas Smith",
    "Nicholas Doe",
    "Eric Smith",
    "Eric Doe",
    "Jonathan Smith",
    "Jonathan Doe",
    "Stephen Smith",
    "Stephen Doe",
    "Larry Smith",
    "Larry Doe",
    "Justin Smith",
    "Justin Doe",
    "Scott Smith",
    "Scott Doe",
    "Brandon Smith",
    "Brandon Doe",
    "Frank Smith",
    "Frank Doe",
    "Benjamin Smith",
    "Benjamin Doe",
    "Gregory Smith",
    "Gregory Doe",
    "Samuel Smith",
    "Samuel Doe",
    "Raymond Smith"
  ];
  const reviews = {} as {
    [x: string]: Review;
  };

  for (let i = 0; i < faker.number.int({ min: 2, max: 20 }); i++) {
    reviews[names[faker.number.int({ max: names.length - 1 })]] = {
      store: stores[faker.number.int({ max: stores.length - 1 })],
      rating: roundedFloat(1, 5),
      comment: faker.lorem.words()
    };
  }

  return reviews;
};

const theatres = [
  "Starlight Theatre",
  "The Royal Playhouse",
  "Broadway Lights Theatre",
  "The Grand Stage",
  "Cinema Paradiso",
  "Apollo Theater",
  "The Globe Theatre",
  "Renaissance Theatre Company",
  "DramaFest Studios",
  "The Phoenix Theatre",
  "Majestic Theatre",
  "The Red Curtain",
  "Epicenter Stage",
  "The Spotlight Hall",
  "Dreamland Theatres",
  "The Drama Loft",
  "Classic Theatre Works",
  "The Magic Lantern",
  "StageCraft Studios",
  "Shakespearean Dreams Theatre"
];

const plays = [
  "Echoes of Eternity",
  "Midnight Serenade",
  "Shadows of the Past",
  "Whispers in the Wind",
  "Enchanted Dreams",
  "Dance of Destiny",
  "Forgotten Melodies",
  "Echoes of Tomorrow",
  "Twilight Tales",
  "Aurora's Lullaby",
  "Chronicles of Courage",
  "Symphony of Secrets",
  "Moonlight Masquerade",
  "Dreams of Discovery",
  "The Lost Symphony",
  "Spirits of Solitude",
  "Legends of Luminescence",
  "Harmony's Quest",
  "Waves of Wonder",
  "The Secret Garden"
];

const findTheatre = async ({
  ...params
}: TTheatreQuery): Promise<Theatre[]> => {
  const { date, priceRange, partySize, seatType, play, playwright } =
    params;

  let price = priceRange === 0 ? 9999 : priceRange;

  const getResult = () => {
    return {
      venue: getRandom(theatres),
      play: getRandom(plays, play),
      playwright: playwright || faker.person.firstName(),
      showTimes: showTimes({ refDate: date }),
      ticketPrice: roundedFloat(1, price),
      theatreRating: roundedFloat(1, 5),
      seatType: getRandom(SeatType, seatType),
      intervalDuration: `${faker.number.int({
        min: 1,
        max: 10
      })} minutes`
    } as Theatre;
  };

  return Array.from({ length: randomInt(1, 18) }, getResult).sort(
    (a, b) => a.showTimes[0].date.valueOf() - b.showTimes[0].date.valueOf()
  ) as Theatre[];
};

const setList = [
  "Opening Act",
  "Hit Song Medley",
  "Acoustic Interlude",
  "Fan Favorites",
  "Collaboration with Special Guest",
  "New Releases Showcase",
  "Instrumental Jam Session",
  "Crowd Sing-Along Moment",
  "Encore Performance",
  "Introduction",
  "Hit Song 1",
  "Fan Favorite 1",
  "Energetic Anthem",
  "Ballad Moment",
  "Crowd Interaction",
  "Throwback Hit",
  "Encore Performance"
];

const venues = [
  "Crystal Ballroom",
  "The Grand Pavilion",
  "Starlight Arena",
  "Golden Terrace Hall",
  "Sapphire Convention Center",
  "Diamond Plaza",
  "Emerald Gardens",
  "The Pearl Auditorium",
  "Royal Banquet Hall",
  "Silver Moon Ballroom",
  "Topaz Event Center",
  "Opal Conference Hall",
  "Velvet Lounge",
  "Majestic Palace",
  "The Ivory Hall",
  "The Ruby Theater",
  "Platinum Pavilion",
  "Amber Hall",
  "Oasis Convention Center",
  "The Onyx Ballroom"
];

const findConcert = async ({
  ...params
}: TConcertQuery): Promise<Concert[]> => {
  const { date, artist, priceRange, partySize, seatType } = params;
  let price = priceRange === 0 ? 9999 : priceRange;
  const getResult = () => {
    return {
      artist: getRandom([faker.person.firstName(), artist]),
      venue: getRandom(venues),
      date: faker.date.soon({
        refDate: date,
        days: 1
      }),
      concert: getRandom(Concerts),
      ticketPrice: roundedFloat(1, price),
      setList: randomList(setList),
      venueRating: roundedFloat(1, 5),
      attendees: faker.number.int({ min: 1, max: 1000 }),
      seatType: getRandom(SeatType, seatType)
    } as Concert;
  };

  return Array.from({ length: randomInt(1, 18) }, getResult).sort(
    (a, b) => a.date.valueOf() - b.date.valueOf()
  ) as Concert[];
};

const teams = {
  Football: [
    "Real Madrid",
    "Barcelona",
    "Manchester United",
    "Liverpool",
    "Bayern Munich",
    "Paris Saint-Germain",
    "Juventus",
    "AC Milan",
    "Chelsea",
    "Arsenal",
    "Manchester City",
    "Borussia Dortmund",
    "Inter Milan",
    "Atletico Madrid",
    "Ajax",
    "Roma",
    "Tottenham Hotspur",
    "PSV Eindhoven",
    "Sevilla",
    "Boca Juniors",
    "River Plate",
    "Santos FC",
    "Palmeiras",
    "Flamengo",
    "Cruzeiro",
    "Gremio",
    "FC Barcelona (Women's)",
    "Olympique Lyonnais (Women's)",
    "North Carolina Courage (NWSL)",
    "Portland Thorns FC (NWSL)"
  ] as const,
  Baseball: [
    "New York Yankees",
    "Boston Red Sox",
    "Los Angeles Dodgers",
    "Chicago Cubs",
    "San Francisco Giants",
    "St. Louis Cardinals",
    "Houston Astros",
    "New York Mets",
    "Atlanta Braves",
    "Texas Rangers",
    "Philadelphia Phillies",
    "Detroit Tigers",
    "Oakland Athletics",
    "Washington Nationals",
    "Cleveland Guardians",
    "Chicago White Sox",
    "Toronto Blue Jays",
    "Seattle Mariners",
    "Minnesota Twins",
    "Milwaukee Brewers",
    "Cincinnati Reds",
    "Arizona Diamondbacks",
    "San Diego Padres",
    "Baltimore Orioles",
    "Pittsburgh Pirates",
    "Kansas City Royals",
    "Colorado Rockies",
    "Miami Marlins",
    "Tampa Bay Rays"
  ] as const,
  Basketball: [
    "Los Angeles Lakers",
    "Chicago Bulls",
    "Golden State Warriors",
    "Miami Heat",
    "Boston Celtics",
    "Toronto Raptors",
    "Houston Rockets",
    "Philadelphia 76ers",
    "Dallas Mavericks",
    "Brooklyn Nets",
    "San Antonio Spurs",
    "Denver Nuggets",
    "Portland Trail Blazers",
    "Utah Jazz",
    "Milwaukee Bucks",
    "Atlanta Hawks",
    "New York Knicks",
    "Indiana Pacers",
    "Oklahoma City Thunder",
    "Phoenix Suns",
    "Orlando Magic",
    "Minnesota Timberwolves",
    "Charlotte Hornets",
    "Detroit Pistons",
    "Sacramento Kings",
    "Washington Wizards",
    "Cleveland Cavaliers",
    "Memphis Grizzlies",
    "New Orleans Pelicans",
    "Los Angeles Clippers"
  ] as const,
  Hockey: [
    "Anaheim Ducks",
    "Arizona Coyotes",
    "Boston Bruins",
    "Buffalo Sabres",
    "Calgary Flames",
    "Carolina Hurricanes",
    "Chicago Blackhawks",
    "Colorado Avalanche",
    "Columbus Blue Jackets",
    "Dallas Stars",
    "Detroit Red Wings",
    "Edmonton Oilers",
    "Florida Panthers",
    "Los Angeles Kings",
    "Minnesota Wild",
    "Montreal Canadiens",
    "Nashville Predators",
    "New Jersey Devils",
    "New York Islanders",
    "New York Rangers",
    "Ottawa Senators",
    "Philadelphia Flyers",
    "Pittsburgh Penguins",
    "San Jose Sharks",
    "Seattle Kraken",
    "St. Louis Blues",
    "Tampa Bay Lightning",
    "Toronto Maple Leafs",
    "Vancouver Canucks",
    "Vegas Golden Knights",
    "Washington Capitals",
    "Winnipeg Jets"
  ] as const,
  Soccer: [
    "Manchester United",
    "Real Madrid",
    "FC Barcelona",
    "Bayern Munich",
    "Liverpool",
    "Paris Saint-Germain",
    "Juventus",
    "Chelsea",
    "AC Milan",
    "Ajax",
    "Borussia Dortmund",
    "Atletico Madrid",
    "Inter Milan",
    "Arsenal",
    "Manchester City",
    "Tottenham Hotspur",
    "FC Porto",
    "AS Roma",
    "Napoli",
    "Benfica",
    "Sporting CP",
    "River Plate",
    "Boca Juniors",
    "Sao Paulo FC",
    "Flamengo",
    "Cruzeiro",
    "Palmeiras",
    "Barcelona SC",
    "Fluminense",
    "Vasco da Gama",
    "Ajax",
    "PSV Eindhoven",
    "Feyenoord",
    "Galatasaray",
    "Besiktas",
    "Fenerbahce",
    "Celtic",
    "Rangers",
    "Anderlecht",
    "Club Brugge",
    "Shakhtar Donetsk",
    "Zenit Saint Petersburg",
    "CSKA Moscow",
    "Bayer Leverkusen",
    "Schalke 04",
    "Olympique Marseille",
    "Lyon",
    "AS Monaco",
    "Porto",
    "Sporting Lisbon",
    "Benfica",
    "Sevilla FC",
    "Valencia CF",
    "Villarreal CF",
    "Real Betis",
    "Athletic Bilbao",
    "Leicester City",
    "West Ham United",
    "Leeds United",
    "Everton",
    "Wolverhampton Wanderers",
    "Crystal Palace",
    "Newcastle United",
    "Southampton",
    "Brighton & Hove Albion",
    "Aston Villa",
    "Burnley",
    "Watford",
    "Brentford"
  ] as const,
  Tennis: [
    "Roger Federer",
    "Rafael Nadal",
    "Novak Djokovic",
    "Serena Williams",
    "Ashleigh Barty",
    "Simona Halep",
    "Naomi Osaka",
    "Dominic Thiem",
    "Stefanos Tsitsipas",
    "Daniil Medvedev",
    "Bianca Andreescu",
    "Karolina Pliskova",
    "Alexander Zverev",
    "Petra Kvitova",
    "Andrey Rublev",
    "Garbine Muguruza",
    "Andy Murray",
    "Venus Williams",
    "Kei Nishikori",
    "Victoria Azarenka",
    "Diego Schwartzman",
    "Elina Svitolina",
    "Gael Monfils",
    "Aryna Sabalenka",
    "Fabio Fognini",
    "Johanna Konta",
    "Stan Wawrinka",
    "Karolina Muchova",
    "Matteo Berrettini",
    "Anett Kontaveit",
    "David Goffin",
    "Belinda Bencic",
    "Felix Auger-Aliassime",
    "Kiki Bertens",
    "Alex de Minaur",
    "Sofia Kenin",
    "Denis Shapovalov",
    "Angelique Kerber",
    "Grigor Dimitrov",
    "Marketa Vondrousova",
    "Pablo Carreno Busta",
    "Jelena Ostapenko",
    "Casper Ruud",
    "Cori Gauff",
    "Hubert Hurkacz",
    "Madison Keys",
    "Cristian Garin",
    "Donna Vekic",
    "John Isner",
    "Dayana Yastremska",
    "Karen Khachanov",
    "Caroline Wozniacki",
    "Nick Kyrgios"
  ] as const
};

const events = {
  Football: [
    "World Cup Final",
    "Champions League Final",
    "Super Bowl",
    "FIFA Club World Cup",
    "UEFA Europa League Final",
    "Copa America Final",
    "AFC Asian Cup Final",
    "CAF Africa Cup of Nations Final",
    "CONCACAF Gold Cup Final",
    "Premier League Derby",
    "El Clasico",
    "Copa Libertadores Final",
    "Bundesliga Top Match",
    "Serie A Showdown",
    "CAF Champions League Final",
    "MLS Cup Final",
    "FA Cup Final",
    "Coppa Italia Final",
    "DFB-Pokal Final",
    "La Liga Clash",
    "EFL Cup Final",
    "Copa del Rey Final",
    "FIFA U-20 World Cup Final",
    "FIFA Women's World Cup Final",
    "Olympic Football Final",
    "AFC U-23 Championship Final",
    "CONCACAF Nations League Final",
    "FIFA U-17 World Cup Final",
    "Women's Champions League Final",
    "FIFA Beach Soccer World Cup Final"
  ],
  Baseball: [
    "Opening Day",
    "Home Run Derby",
    "All-Star Game",
    "World Series",
    "Spring Training",
    "Playoffs",
    "Wildcard Game",
    "League Championship Series (ALCS/NLCS)",
    "World Baseball Classic",
    "Hall of Fame Induction Ceremony",
    "Perfect Game",
    "No-Hitter",
    "Triple Play",
    "Grand Slam",
    "Rivalry Game",
    "Doubleheader",
    "Walk-off Win",
    "Extra-Inning Game",
    "Pitcher's Duel",
    "Baseball Winter Meetings"
  ],
  Basketball: [
    "NBA Finals",
    "NCAA March Madness",
    "FIBA Basketball World Cup",
    "NBA All-Star Weekend",
    "EuroLeague Final Four",
    "WNBA Finals",
    "Olympic Basketball Tournament",
    "NBA Draft",
    "NCAA Men's Final Four",
    "NCAA Women's Final Four",
    "FIBA Continental Cup",
    "NBA Summer League",
    "WNBA All-Star Game",
    "NBA Opening Night",
    "NBA Christmas Day Games",
    "FIBA Asia Cup",
    "NBA Global Games",
    "WNBA Draft",
    "NBA Playoffs",
    "WNBA Regular Season"
  ],
  Hockey: [
    "Stanley Cup Finals",
    "All-Star Game",
    "Winter Classic",
    "World Championships",
    "Preseason Tournaments",
    "Playoff Series",
    "Outdoor Showcase",
    "International Friendlies",
    "College Hockey Championships",
    "Youth Hockey Tournament"
  ],
  Soccer: [
    "FIFA World Cup",
    "UEFA Champions League Final",
    "Copa America",
    "Premier League Matchday",
    "La Liga El Clasico",
    "Bundesliga Derby",
    "Serie A Showdown",
    "CAF Champions League Final",
    "CONCACAF Gold Cup",
    "AFC Champions League Quarterfinals",
    "MLS All-Star Game",
    "FIFA Women's World Cup",
    "Copa Libertadores Final",
    "UEFA Europa League Final",
    "Confederations Cup",
    "EFL Championship Playoff Final",
    "Supercoppa Italiana",
    "FIFA Club World Cup",
    "CONCACAF Nations League Finals",
    "AFC Asian Cup Final"
  ],
  Tennis: [
    "Australian Open",
    "French Open (Roland Garros)",
    "Wimbledon",
    "US Open",
    "ATP Tour Finals",
    "WTA Finals",
    "Indian Wells Masters",
    "Miami Open",
    "Monte-Carlo Masters",
    "Madrid Open",
    "Italian Open",
    "Rogers Cup",
    "Cincinnati Masters",
    "Shanghai Masters",
    "Paris Masters",
    "Fed Cup",
    "Davis Cup",
    "Hopman Cup",
    "Brisbane International",
    "Sydney International",
    "Hobart International",
    "Adelaide International",
    "Kooyong Classic",
    "Mexican Open",
    "Dubai Tennis Championships",
    "Qatar Open",
    "BNP Paribas Open",
    "Miami Open",
    "Volvo Car Open",
    "Porsche Tennis Grand Prix",
    "Mutua Madrid Open",
    "Internazionali BNL d'Italia",
    "Nature Valley Classic (Birmingham)",
    "Eastbourne International",
    "Wimbledon",
    "Swiss Open Gstaad"
  ]
};
const stadiums = [
  "Grand Slam Arena",
  "Victory Stadium",
  "Epic Sports Arena",
  "Spectra Stadium",
  "Unity Arena",
  "Champion Park",
  "Dynamic Dome",
  "Ultimate Coliseum",
  "Elevation Field",
  "Pinnacle Arena",
  "Harmony Stadium",
  "Summit Sports Complex",
  "Elite Arena",
  "Majestic Stadium",
  "Apex Pavilion",
  "Unity Center",
  "Triumph Arena",
  "Prime Stadium",
  "Pantheon Park",
  "Vortex Stadium",
  "Ascend Arena",
  "Infinity Field",
  "Legacy Stadium",
  "Sovereign Sports Center",
  "Crown Arena",
  "Panorama Park",
  "Ecliptic Stadium",
  "Momentum Arena",
  "Emperor Field",
  "Rising Sun Stadium",
  "Supreme Sports Complex",
  "Elysium Arena",
  "Summit Park",
  "Legacy Dome",
  "Serenity Stadium",
  "Empire Arena",
  "Harmony Park",
  "Tranquil Pavilion",
  "Legacy Field"
];

const broadcastingChannels = [
  "ABC",
  "NBC",
  "CBS",
  "FOX",
  "ESPN",
  "BBC",
  "CNN",
  "HBO",
  "MTV",
  "Discovery Channel",
  "National Geographic",
  "Cartoon Network",
  "Disney Channel",
  "History Channel",
  "TNT",
  "TBS",
  "CNBC",
  "Al Jazeera",
  "Sky Sports",
  "Star Sports",
  "MTV",
  "VH1",
  "Comedy Central",
  "Lifetime",
  "Food Network",
  "HGTV",
  "Netflix",
  "Hulu",
  "Amazon Prime Video",
  "Apple TV+",
  "Disney+",
  "BBC One",
  "FOX News",
  "Bravo",
  "A&E",
  "Syfy",
  "National Public Radio (NPR)",
  "The Weather Channel",
  "MTV",
  "E! Entertainment",
  "Travel Channel",
  "Animal Planet",
  "MTV",
  "BBC World News",
  "Sky News",
  "Fox Sports",
  "ESPN2",
  "USA Network",
  "Nickelodeon",
  "MTV",
  "C-SPAN",
  "PBS",
  "TLC"
];

const teamsBySport = (sport: TSportEvent) => {
  return teams[sport];
};

const randomTeam = (sport: TSportEvent) => {
  return getRandom(teamsBySport(sport));
};

const randomEvent = (sport: TSportEvent) => {
  return getRandom(events[sport]);
};

const randomStadium = () => {
  return getRandom(stadiums);
};

async function findSports<T extends TSportEvent = TSportEvent>({
  ...params
}: TSportsQuery<T>): Promise<Sports[]> {
  const { date, priceRange, partySize, seatType, team } = params;

  let price = priceRange === 0 ? 9999 : priceRange;

  const sport =
    params.sport || getRandom(Object.keys(events) as TSportEvent[]);

  return Array.from({ length: randomInt(1, 18) }, () => ({
    type: sport,
    event: randomEvent(sport),
    teams: [team || randomTeam(sport), randomTeam(sport)],
    ticketPrice: roundedFloat(1, price),
    date: faker.date.soon({
      refDate: date,
      days: 1
    }),
    stadiumName: randomStadium(),
    seatType: getRandom(SeatType, seatType),
    broadcastingChannels: randomList(broadcastingChannels)
  })).sort((a, b) => a.date.valueOf() - b.date.valueOf()) as Sports[];
}

const findNightlife = async ({
  ...params
}: TNightlifeQuery): Promise<Nightlife[]> => {
  const { date, dressCode, priceRange, partySize, atmosphere, club } =
    params;
  let price = priceRange === 0 ? 9999 : priceRange;

  return Array.from({ length: randomInt(1, 18) }, () => {
    return {
      venue: getRandom(Clubs, club),
      dressCode: getRandom(DressCode, dressCode),
      coverCharge: roundedFloat(1, price) * partySize,
      ageRestriction: randomInt(18, 21),
      openingHours: openingHours(),
      livePerformances: faker.datatype.boolean(),
      atmosphere: getRandom(Atmosphere, atmosphere),
      music: randomList(Music),
      drinks: randomList(Drinks)
    } as Nightlife;
  }).sort((a, b) => a.coverCharge - b.coverCharge) as Nightlife[];
};

/** Generates a list of hot sales and deals  */
const findShopping = async ({
  ...params
}: TShoppingQuery): Promise<Shopping[]> => {
  const { location, priceRange } = params;
  let price = priceRange === 0 ? 9999 : priceRange;
  const store = getRandom(StoreNames);
  const reviews = await customerReviews([store]);

  const getResult = () => {
    return {
      mall: getRandom(StoreNames, location),
      store: store,
      openingHours: openingHours(),
      kind: getRandom(MallType),
      sale: {
        name: getRandom(Sales),
        discount: `${randomInt(10, 50)}%`,
        description: faker.lorem.sentence(),
        date: faker.date.soon({
          refDate: params.date || new Date(Date.now())
        })
      },
      deal: {
        name: getRandom(Deals),
        description: faker.lorem.sentence()
      },
      customerReviews: reviews,
      shoppingBudget: faker.number.float({ min: 1, max: price })
    } as Shopping;
  };
  return Array.from({ length: randomInt(1, 18) }, getResult).sort((a, b) =>
    a.mall.localeCompare(b.mall)
  ) as Shopping[];
};
