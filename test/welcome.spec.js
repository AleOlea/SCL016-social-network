import { welcome } from '../src/components/welcome';

describe('Welcome', () => {
  it('should render without crashing', () => {
    const el = welcome();
    expect(el instanceof HTMLElement).toBe(true);
  });
});
