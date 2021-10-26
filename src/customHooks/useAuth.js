import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const mapState = ({ user }) => ({
  currentUser: user.currentUser
});


const useAuth = props => {

  const { currentUser } = useSelector(mapState);

  const history = useHistory();

  const path = window.location.pathname;

  useEffect(() => {
    if (!currentUser) {

      history.push("/login/?path=" + path + "");

    }

  }, [currentUser]);

  return currentUser;

};

export default useAuth;