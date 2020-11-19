import React, { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'


const Login = () => {
    const history = useHistory()
    const firebase = useFirebase()
    const [ user, setUser ] = useState({
      email: "",
      password: "",
    });
  
    const onInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      await firebase.login(user)
      history.push('/dashboard')
    }

    return (
      <div className="container mt-5">
          <div className="row">
              <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <h2 className='text-center'>Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name='email'
                          onChange={onInputChange} value={user.email}  
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name='password'
                         onChange={onInputChange} value={user.password} 
                         />
                    </div>
                    <Link className='d-block my-3' to='forgot-pass'>Lupa Password ?</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              <Link className='text-center d-block my-3' to='/register'>Belum Punya Akun ? Register Kuy !</Link>
              </div>
          </div>
      </div>
    )
}

export default Login
