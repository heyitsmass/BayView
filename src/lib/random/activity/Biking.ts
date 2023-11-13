import { Biking } from '@/types/Event';
import { hiking } from './Hiking';
/**
 * Generate a random biking event
 */
export const biking = (): Biking => {
  return {
    ...hiking(
      [
        'Helmet',
        'Bike',
        'Cycling Shorts',
        'Cycling Jersey',
        'Gloves',
        'Cycling Shoes',
        'Water Bottle and Cage',
        'Sunglasses',
        'Bike Repair Kit',
        'Bike Pump',
        'Multi-tool',
        'Bike Lights',
        'Reflective Gear',
        'Cycling Computer',
        'Bike Lock',
        'Backpack'
      ],
      [
        'Scenic Viewpoint',
        'Mountain Summit',
        'Lake or Reservoir',
        'Historic Landmark',
        'Wildlife Observation Area',
        'Cycling Trailhead',
        'Picnic Spot',
        'Bike-Friendly Cafe',
        'Bike Repair Station',
        'Art Installation or Sculpture'
      ]
    )
  };
};
