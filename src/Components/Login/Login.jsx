import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('');      

  const emailRef = useRef(null)
    const lgInHandler = (e)=> {
        e.preventDefault()
        let email = e.target.email.value;
        let password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user);
          if (result.user.emailVerified) {
            
            setLoginSuccess('logged in successfully')
          }else{
            alert('please verify your email address');

          }
        })
        .catch(error => {
          setLoginError('invalid user')
          console.log(error)
        })
        
      
    }

    const handleForgetPassword = ()=> {
      const email= emailRef.current.value;
      if (!email) {
        alert('please provide an valid email')
        return;
      }else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        alert('invalid email')
        return;
      }
      
      sendPasswordResetEmail(auth, email)
      .then(() =>{
        alert('please check your email')
      })
      .catch(error=> {
        console.log(error)
      })
      
    }


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={lgInHandler}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                
                  type="email"
                  required
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  
                  type="password"
                  required
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a 
                  
                  onClick={handleForgetPassword} className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div>
                <p className="text-sm"> new ? <Link className="underline text-violet-400" to='/register'>Register Now</Link></p>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
        {
          loginError && <p className="text-red-400">{loginError}</p>
        }{
          loginSuccess && <p className="text-green-400">{loginSuccess}</p>
        }
      </div>
    </div>
  );
};

export default Login;
