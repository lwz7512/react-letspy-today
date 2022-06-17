import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export const isAuthenticated = () => !!localStorage.getItem('LETSPY_TOKEN')

/**
 * parse token id
 * @returns user info
 */
export const decodeToken = () => {
  if (!isAuthenticated()) return {}
  const token = localStorage.getItem('LETSPY_TOKEN')
  return jwt_decode(token)
}

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