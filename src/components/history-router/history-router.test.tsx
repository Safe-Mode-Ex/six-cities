import { render, screen } from '@testing-library/react';
import HistoryRouter from './history-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

describe('Component: HistoryRouter', () => {
  const expectedText = 'Expected text';
  const expectedComponent = <span>{expectedText}</span>;
  const unexpectedText = 'Ubexpected text';
  const unexpectedComponent = <span>{unexpectedText}</span>;

  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should render properly', () => {
    const withHistoryRouterComponent = (
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={expectedComponent}></Route>
          <Route path='/login' element={unexpectedComponent}></Route>
        </Routes>
      </HistoryRouter>
    );

    render(withHistoryRouterComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });

  it('should lead to /login after history.push(/login)', () => {
    const withHistoryRouterComponent = (
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={unexpectedComponent}></Route>
          <Route path='/login' element={expectedComponent}></Route>
        </Routes>
      </HistoryRouter>
    );

    history.push('/login');
    render(withHistoryRouterComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(unexpectedText)).not.toBeInTheDocument();
  });
});
