import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils';
import LoginForm from './login-form';

describe('Component: LoginForm', () => {
  let preparedComponent: JSX.Element;

  beforeEach(() => {
    const { withStoreComponent } = withStore(<LoginForm />, {});
    preparedComponent = withHistory(withStoreComponent);
  });

  it('should render properly', () => {
    const signInText = /Sign in/i;
    const emailText = /E-mail/i;
    const passwordText = /Password/i;

    render(preparedComponent);

    expect(screen.getByText(signInText)).toBeInTheDocument();
    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render properly when user enters login and password', async () => {
    const emailInputTestId = 'email-input';
    const passwordInputTestId = 'password-input';
    const expectedEmailValue = 'test@test.com';
    const expectedPasswordValue = '123456';

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(emailInputTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordInputTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
