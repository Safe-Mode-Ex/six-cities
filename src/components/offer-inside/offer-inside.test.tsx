import { render, screen } from '@testing-library/react';
import MemoizedOfferInside from './offer-inside';

describe('Component: Offer Inside', () => {
  it('should render properly', () => {
    const expectedGoods = [''];
    const goodsContainerId = 'goods-container';
    const featureValueId = 'feature-value';

    render(<MemoizedOfferInside goods={expectedGoods} />);
    const goodsContainer = screen.getByTestId(goodsContainerId);
    const featureValues = screen.getAllByTestId(featureValueId);

    expect(goodsContainer).toBeInTheDocument();
    expect(featureValues.length).toBe(expectedGoods.length);
  });
});
