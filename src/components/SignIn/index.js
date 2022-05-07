import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import { apiInstance2 } from './../../Utils'

import SimpleDialog from './../Dialog';

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { CircularProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr.login
});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  const params = new URLSearchParams(useLocation().search);
  const path = params.get("path");


  if (userErr) {
    var str = userErr.code;
    str = str.split("/").pop();
    str = str.replaceAll("-", " ").toUpperCase();
  }




  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  useEffect(() => {
    if (userErr) {
      setLoading(false);
      setOpenErr(true);
    }
  }, [userErr])


  useEffect(() => {
    if (!currentUser && path) {
      setOpenAlert(true);
    }
    if (currentUser) {
      resetForm();
      if (path !== null)
        history.push(path);
      else
        history.push('/')
    }

  }, [currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(emailSignInStart({ email, password }));
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  return (
    <AuthWrapper headline='Login'>
      <div className="formWrap">
        <SimpleDialog open={openAlert} text={`Login/Register to Proceed to ${path && path.replace('/', '').toUpperCase()}`} onClose={() => setOpenAlert(false)} />
        <SimpleDialog open={openErr} text={str} onClose={() => setOpenErr(false)} />
        <Helmet>
          {/* <meta name="description" content="Rediva | Login to your registered account to order our products and access your account dashboard." /> */}
          <title>Rediva | Login</title>
        </Helmet>
        <form onSubmit={handleSubmit}>

          <FormInput
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            required
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <Button disable={(email.length < 5 || password.length < 4).toString()} type="submit">
            {loading === true ?
              <CircularProgress size={10} color="inherit" /> : 'LogIn'
            }

          </Button>

          {/* <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div> */}

          <div className="links">
            <Link to={path ? "/registration/?path=" + path + "" : "/registration"}>
              Register
            </Link>
            {"|"}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;