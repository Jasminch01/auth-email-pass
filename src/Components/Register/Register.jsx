import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";
import { Link } from "react-router-dom";


const Register = () => {
  const [registerError, setRegisterError] = useState('')
  const [success , setSuccess] = useState('');
  const [isShow, setIsShow] = useState('')
  const registerHandler = (e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.trams.checked;

    
    setRegisterError('');
    setSuccess('')
    if (password.length < 6) {
      setRegisterError('password should be 6 characteres or longer');
      return;
    }else if(!/[A-Z]/.test(password)){
      setRegisterError('your password should have one uppercase characteres')
      return;
    }else if (!accepted){
      setRegisterError('Accept trams and conditions');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user
      console.log(user)
      setSuccess('user create successfully');

      updateProfile(user, {
        displayName: name, photoURL : "https://example.com/jane-q-user/profile.jpg"
      })
      .then(()=>{
        console.log('update usere profile successfully')
      })
      .catch((error)=>{
        console.log(error)
      })

      sendEmailVerification(result.user)
      .then(() => {
        alert('please check your email to verify your account')
      })
    })
    .catch(error => {
      setRegisterError(error.message)
    })
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Registration!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={registerHandler}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                type= {isShow ? 'text' : 'password'}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  />
                  <span onClick={()=>setIsShow(!isShow)} className="absolute right-3 top-14">{!isShow? <HiMiniEye></HiMiniEye> : <HiMiniEyeSlash></HiMiniEyeSlash>}</span>
              </div>
              <div className="mt-3">
                <input type="checkbox" name="trams" id="" />
                <label className="ms-2" htmlFor="trams">Accept our <a href="" className="underline text-violet-400">trams and conditions</a></label>
              </div>
              <div className="mt-3">
                <p className="text-sm">Already have an account? <Link className="text-violet-400 underline" to = '/login'>Log in</Link></p>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              </form>
            </div>
          </div>
          {
            registerError && <p className="text-red-400">{registerError}</p>
          }
          {
            success && <p className="text-green-400">{success}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Register;
