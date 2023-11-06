import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Page from './page';

describe('Page Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
});
