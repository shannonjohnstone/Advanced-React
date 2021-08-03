import PropTypes from 'prop-types';
import Page from '../components/Page';

export default function RootApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

RootApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
