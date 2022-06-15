import { Redirect } from 'react-router-dom'

export const isAuthenticated = () => !!localStorage.getItem('LETSPY_TOKEN')

/**
 * comoponent wrapper for login checking
 * @param {*} Component 
 * @returns 
 */
const withAuth = (Component) => {
  return (props) => {
    if (!isAuthenticated()) {
      return <Redirect to="/profile" />;
    }
    return <Component {...props} />;
  };
};

export default withAuth