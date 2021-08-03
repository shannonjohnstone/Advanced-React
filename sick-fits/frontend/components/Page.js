/* eslint react/jsx-props-no-spreading: 0 */
import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
      <h1>This is a page</h1>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
