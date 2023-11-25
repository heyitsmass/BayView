import { Dining, MealPeriodInfo, MealTypes, Offer } from '@/types/Event';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

/** Generate a random dining activity.  */
export const dining = (): Dining => {
  const offer = () => {
    const _date = faker.date.soon();

    return {
      key: _date.toLocaleDateString('it-IT'),
      value: {
        offerId: faker.string.uuid(),
        time: _date.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        label: ['breakfast', 'lunch', 'dinner'][randomInt(0, 3)] as MealTypes
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
    let res = '$';
    for (let i = 0; i < randomInt(0, 3); i++) {
      res += '$';
    }
    return res;
  };

  const mealPeriodInfo = () => {
    const cuisineTypes = [
      'italian',
      'chinese',
      'french',
      'japanese',
      'american',
      'mexican',
      'indian',
      'thai',
      'greek'
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


  const mealPeriod = mealPeriodInfo(); 

  console.log(mealPeriod);
  return {
    priceRange: priceLegend(),
    mealPeriodInfo: mealPeriodInfo(),
    admissionRequired: faker.datatype.boolean(),
    offers: {
      [key]: values
    }
  };
};
