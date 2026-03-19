import Header from '../../components/header/header';

type PageLayoutProps = {
    children: JSX.Element;
}

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      {children}
    </div>
  );
}

export default PageLayout;
