import {
  IconDefinition,
  faDiscord,
  faFacebook,
  faGithub,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EnabledRecipes = 'facebook' | 'github' | 'google' | 'discord'; // 1

const icons = {
  facebook: faFacebook,
  github: faGithub,
  google: faGoogle,
  discord: faDiscord
} as {
  [P in EnabledRecipes]: IconDefinition;
};

const colors = {
  facebook: '#4267B2',
  github: '#333',
  google: '#db4437',
  discord: '#7289da'
} as {
  [P in EnabledRecipes]: string;
};

export const SocialButton = ({ recipe }: { recipe: EnabledRecipes }) => {
  return (
    <div className="rounded-full py-2 text-xl">
      <FontAwesomeIcon icon={icons[recipe]} fill={colors[recipe]} />
    </div>
  );
};
