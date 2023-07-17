import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)

  return (
    <nav className="nav-bar">
      <LogoContainer>
        <Link to="/">
          <h2 class="logo">Tech Zone</h2>
        </Link>
      </LogoContainer>
      <Link to="/cart">
        <div className="nav-bag">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      {
        auth._id ? (
          <Logout onClick={() => {
            dispatch(logoutUser(null));
            toast.warning("Logged out", { position: "bottom-left" });
          }}>Logout</Logout>
        ) : (
          <AuthLinks>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </AuthLinks>
        )
      }
    </nav >
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child{
      margin-left: 2rem;
    }
  }
`;

const Logout = styled.div`
  color: white;
  cursor: pointer;
`;

const LogoContainer = styled.div`
`;