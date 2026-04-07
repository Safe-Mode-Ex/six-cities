import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/use-app-selector/use-app-selector';
import { PASSWORD_REGEXP } from '../../const';
import { loginAction } from '../../store/api-actions';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };
  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={emailRef}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          data-testid="email-input"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={passwordRef}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          pattern={PASSWORD_REGEXP}
          required
          data-testid="password-input"
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
