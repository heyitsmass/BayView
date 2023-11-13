  FlightModel,
  HotelModel,
  TheatreModel,
  Flight,
  Hotel,
  Theatre,
    Hotel: HotelModel,
    Dining: DiningModel,
    Flight: FlightModel,
    Theatre: TheatreModel,
    case "Dining":
      return getDinner();
    case "Flight":
      return getFlight();
    case "Hotel":
      return getHotel();
    case "Theatre":
      return getTheatre();

/** Generate a random flight. */
const getFlight = (): Flight => {
  const seatOptions = ["A", "B", "C", "D", "E", "F"];

  const seat = () => {
    return {
      row: faker.number.int({ min: 1, max: 20 }),
      seat: seatOptions[randomInt(0, seatOptions.length)]
    };
  };

  const gate = () => {
    const gates = [...seatOptions, "G", "H", "I", "J"];

    return (
      gates[randomInt(0, gates.length)] +
      faker.number.int({ min: 1, max: 20 })
    );
  };

  return {
    departureTime: faker.date.soon(),
    arrivalTime: faker.date.soon(),
    flightNumber: faker.number.int({ min: 100, max: 1200 }),
    airline: faker.airline.airline(),
    airport: faker.airline.airport(),
    reservationNumber: faker.airline.recordLocator(),
    gate: gate(),
    seats: [seat(), seat()]
  };
};

/** Generate a random hotel reservation. */
const getHotel = (): Hotel => {
  const { dateTo, dateFrom } = date({ days: 7 });

  const roomNumber = () => faker.number.int({ min: 100, max: 1200 });

  return {
    checkIn: dateTo,
    checkOut: dateFrom,
    roomNumber: roomNumber()
  };
};
/** Generate a random dining activity.  */
const getDinner = (): Dining => {
  const offer = () => {
    const _date = faker.date.soon();

    return {
      key: _date.toLocaleDateString("it-IT"),
      value: {
        offerId: faker.string.uuid(),
        time: _date.toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        label: ["breakfast", "lunch", "dinner"][
          randomInt(0, 3)
        ] as MealTypes
      }
    } as {
      key: string;
      value: Offer;
    };
  };

  const offers = () => {
    const { key } = offer();

    const values = [] as any[];

    for (let i = 0; i < randomInt(1, 15); i++) {
      const { value } = offer();

      values.push(value);
    }

    return {
      key,
      values
    } as {
      key: string;
      values: Offer[];
    };
  };

  const priceLegend = () => {
    let res = "$";
    for (let i = 0; i < randomInt(0, 3); i++) {
      res += "$";
    }
    return res;
  };

  const mealPeriodInfo = () => {
    const cuisineTypes = [
      "italian",
      "chinese",
      "french",
      "japenese",
      "american",
      "mexican",
      "indian",
      "thai",
      "greek"
    ];

    return {
      _type: faker.lorem.word(),
      name: faker.lorem.word(),
      experience: faker.lorem.words(),
      priceLegend: priceLegend(),
      primaryCuisineType: cuisineTypes[randomInt(0, cuisineTypes.length)]
    } as MealPeriodInfo;
  };

  const { key, values } = offers();

  return {
    priceRange: priceLegend(),
    mealPeriodInfo: mealPeriodInfo(),
    admissionRequired: faker.datatype.boolean(),
    offers: {
      [key]: values
    }
  };
};

/** Generate a random thetre show. */
const getTheatre = (): Theatre => {
  return {
    play: faker.lorem.words(),
    playwright: faker.person.firstName(),
    showTimes: showTimes(),
    ticketPrice: faker.number.float({ min: 1, max: 100 }),
    theatreRating: faker.number.float({ min: 1, max: 5 }),
    seatingCapacity: faker.number.int({ min: 1, max: 1000 }),
    isSoldOut: faker.datatype.boolean(),
    intervalDuration: `${faker.number.int({
      min: 1,
      max: 10
    })} minutes`
  };
};
