import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { Helmet } from 'react-helmet';
import SimpleDialog from '../Dialog';
import { CircularProgress } from '@material-ui/core';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr.reset
});

const EmailPassword = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [openErr, setOpenErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openResetSuccessMsg, setOpenResetSuccessMsg] = useState(false);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      setOpenResetSuccessMsg(true);
      setLoading(false);
    }

  }, [resetPasswordSuccess, history]);

  const handleclose = () => {
    setOpenResetSuccessMsg(false);
    history.push('/login');

  }

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setLoading(false);
      setErrors(userErr);
      setOpenErr(true);
    }
  }, [userErr]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(resetPasswordStart({ email }));
  }

  return (
    <AuthWrapper headline="Reset Password">
      <div className="formWrap">
        <Helmet>
          <meta name="description" content="Rediva | Reset your frogotten password here, Link will be sent to your email ID. Go through Mail for reset LINK." />
          <title>Rediva | Reset Password</title>
        </Helmet>
        <SimpleDialog open={openResetSuccessMsg} text={`Reset Email has been sent to ${email}, <br /> Check Inbox to reset..`} onClose={handleclose} />

        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  <SimpleDialog open={openErr} text={e} onClose={() => setOpenErr(false)} />
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <Button type="submit">
            {
              loading === true ? <CircularProgress color="inherit" size={10} /> : "Reset"
            }
          </Button>

        </form>

        <div className="links">
          <Link to="/login">
            LogIn
          </Link>
          {` | `}
          <Link to="/registration">
            Register
          </Link>
        </div>

      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;