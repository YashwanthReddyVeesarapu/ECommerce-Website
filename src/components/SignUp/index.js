import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import SimpleDialog from '../Dialog';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr.signup
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  const params = new URLSearchParams(useLocation().search);
  const path = params.get("path");

  var str = "";

  if (userErr) {
    str = userErr[0];
  }

  if (userErr) {
    str = userErr.code;
    str = str.split("/").pop();
    str = str.replaceAll("-", " ").toUpperCase();
  }



  useEffect(() => {
    if (currentUser) {
      reset();
      if (path !== null)
        history.push(path);
      else
        history.push('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if (userErr) {
      setLoading(false)
      setOpenErr(true);
    }

  }, [userErr]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('')
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setLoading(true);
    dispatch(signUpUserStart({
      displayName,
      phone,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: 'Registration'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <Helmet>
          <meta name="description" content="Rediva | Create your account." />
          <title>Rediva | Register</title>
        </Helmet>

        <SimpleDialog open={openErr} text={str} onClose={() => setOpenErr(false)} />

        <form onSubmit={handleFormSubmit}>

          <FormInput
            required
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            required
            type="tel"
            name="phone"
            value={phone}
            placeholder="Phone"
            handleChange={e => setPhone(e.target.value)}
          />

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

          <FormInput
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            {loading === true ?
              <CircularProgress size={10} color="inherit" /> : 'Register'
            }
          </Button>
        </form>

        <div className="links">
          <Link to={path ? "/login/?path=" + path + "" : "/login"}>
            LogIn
          </Link>
          {` | `}
          <Link to="/recovery">
            Reset Password
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Signup;