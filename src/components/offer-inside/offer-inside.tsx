import { memo } from 'react';

type OfferInsideProps = {
    goods: string[];
}

function OfferInside({ goods }: OfferInsideProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list" data-testid="goods-container">
        {goods.map((feature) => (
          <li className="offer__inside-item" key={feature} data-testid="feature-value">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

const MemoizedOfferInside = memo(OfferInside);

export default MemoizedOfferInside;
