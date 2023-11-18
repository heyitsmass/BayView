import { faker } from '@faker-js/faker';
import { nameAndRandomPrice, openingHours } from '../utils';
import { Spa } from '@/types/Event';

/** Generate a random spa activity.  */
export const spa = (): Spa => {
  return {
    spaPackages: nameAndRandomPrice([
      'Relaxation Retreat',
      'Couples Bliss Package',
      'Detox and Renewal',
      'Pampering Paradise',
      'Tranquil Tranformation',
      'Holistic Harmony',
      'Aromatherapy Delight',
      'Skin Rejuvenation Escape',
      'Stress-Free Serenity',
      'Wellness Wonderland'
    ]),
    wellnessClasses: nameAndRandomPrice([
      'Yoga Basics',
      'Meditation and Mindfulness',
      'Pilates Fusion',
      'Tai Chi for Beginners',
      'Holistic Nutrition Workshop',
      'Stress Reduction Seminar',
      'Zumba Fitness Party',
      'Guided Nature Walk',
      'Breathing Techniques Workshop',
      'Mind-Body Connection Class'
    ]),
    services: nameAndRandomPrice([
      'Swedish Massage',
      'Deep Tissue Massage',
      'Hot Stone Therapy',
      'Aromatherapy Massage',
      'Facial Rejuvenation',
      'Body Scrub and Wrap',
      'Manicure and Pedicure',
      'Couples Massage',
      'Reflexology',
      'Hydrotherapy'
    ]),
    spaRating: faker.number.float({ min: 1, max: 5 }),
    bookingPolicy: faker.lorem.words(),
    openingHours: openingHours()
  };
};
