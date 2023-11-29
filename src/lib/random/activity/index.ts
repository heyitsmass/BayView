import { aquarium } from './Aquarium';

import { amusementPark } from './AmusementPark';

import { biking } from './Biking';

import { concert } from './Concert';

import { golf } from './Golf';

import { hiking } from './Hiking';

import { museum } from './Museum';

import { nightlife } from './Nightlife';

import { park } from './Park';

import { shopping } from './Shopping';

import { spa } from './Spa';

import { sports } from './Sports';

import { theatre } from './Theatre';

import { waterpark } from './Waterpark';
import { Zoo } from '@/types/Event';

import { Activity, EventTypes } from "@/types/Event";

export {
  aquarium,
  amusementPark,
  biking,
  concert,
  golf,
  hiking,
  museum,
  nightlife,
  park,
  shopping,
  spa,
  sports,
  theatre,
  waterpark,
  zoo
};

export const activities = {
  AmusementPark: amusementPark,
  Aquarium: aquarium,
  Biking: biking,
  Concert: concert,
  Golf: golf,
  Hiking: hiking,
  Museum: museum,
  Nightlife: nightlife,
  Park: park,
  Shopping: shopping,
  Spa: spa,
  Sports: sports,
  Theatre: theatre,
  Waterpark: waterpark,
  Zoo: zoo
} as {
  [P in EventTypes]: () => Activity;
};
