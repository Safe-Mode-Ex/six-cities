import { fireEvent, render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  handleFormSubmit: vi.fn(),
}));

vi.mock('../../hooks/use-review-form-submit', () => ({
  default: vi.fn(() => mocks.handleFormSubmit),
}));

describe('Component: ReviewForm', () => {
  const offerId = '1';
  const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />);

  it('should render properly', () => {
    const reviewLlabelText = 'Your review';
    const textAreaPlaceholderText = 'Tell how was your stay, what you like and what can be improved';
    const reviewHelpText = /To submit review please make sure to set/i;
    const submitButtonText = 'Submit';

    render(withStoreComponent);

    expect(screen.getByText(reviewLlabelText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(textAreaPlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(reviewHelpText)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });

  it('should submit form, when user clicks submit button', async () => {
    const submitButtonText = 'Submit';
    const placeholderText = /Tell how was your stay/i;
    const commentText =
        'This is a great place to stay! Highly recommend. The location is perfect, the staff is friendly, and the amenities are top-notch.';

    render(withStoreComponent);
    await userEvent.click(screen.getByDisplayValue('5'));
    await userEvent.type(screen.getByPlaceholderText(placeholderText), commentText);
    fireEvent.submit(screen.getByTestId('reviews-form'));

    expect(screen.getByText(submitButtonText)).not.toBeDisabled();
    expect(mocks.handleFormSubmit).toHaveBeenCalled();
  });
});
