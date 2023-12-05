/** @vitest-environment node */
import { describe, vi } from "vitest";

vi.mock("next/headers", () => {
  return {
    cookies: () => {
      return {
        get: vi.fn(),
        set: vi.fn()
      };
    }
  };
});

describe.skip("Layout Component", async () => {
  //await Users.deleteOne({ username: 'testuser' });
  /*
  it('It should redirect a non-logged in user to the login page.', async () => {
    try {
      const { asFragment } = render(await Layout({ children: undefined }));
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('It should render the layout if the user is logged in.', async () => {
    let form = testUser();
    await registerUser(form);

    form = new FormData();

    form.set('emailOrUsername', 'testuser');
    form.set('password', 'abc1234');

    try {
      await loginUser(form);
    } catch (e) {
    }

    const { asFragment } = render(await Layout({ children: undefined }));

    expect(asFragment()).toMatchSnapshot();
  });*/
});
