import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Guest Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
});
