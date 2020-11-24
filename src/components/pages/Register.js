import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFirebase, useFirestore } from 'react-redux-firebase';

const Register = () => {

    const history = useHistory()
    const firebase = useFirebase()
    const firestore = useFirestore()
    const [ nama, setNama ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ konfirmasiPassword, setKonfirmasiPassword ] = useState('')
    const [ loading ] = useState(false)
    const [ error, setError ] = useState('')


    const handleSubmit = async (e) => {
      e.preventDefault()
      if(password !== konfirmasiPassword) {
        return setError('Password Tidak Sesuai')
      }

      

      await firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
       firebase.auth().currentUser.updateProfile({
         displayName: nama
       }).then(() => {
         return history.push('/login')
       })
      }).catch(err => {
        setError(err.message)
        setEmail('')
        setPassword('')
        setKonfirmasiPassword('')
      })
   
    }

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className='text-center pb-2'>Register</h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                   {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input type="text" className="form-control" value={nama}
                        onChange={(e) => setNama(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" className="form-control" value={email}
                        onChange={(e) => setEmail(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" value={password}
                         onChange={(e) => setPassword(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label>Konfirmasi Password</label>
                      <input type="password" className="form-control" value={konfirmasiPassword}
                        onChange={(e) => setKonfirmasiPassword(e.target.value)} required 
                      />
                  </div>
                  <Link className='d-block my-3' to='forgot-pass'>Lupa Password ?</Link>
                  <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
            <Link className='text-center d-block my-3' to='/login'>Sudah Punya Akun ? Login Kuy !</Link>
            </div>
        </div>
    </div>
    )
}

export default Register
