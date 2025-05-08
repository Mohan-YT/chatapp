import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'
import { LoadingSpin } from '../components/Loadings'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineMessage } from 'react-icons/md'
import { GoMail } from 'react-icons/go'
import { PiPassword } from 'react-icons/pi'

const LoginPage = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    email : "",
    password : ""
  })
  const {isLoggingIn,login} = useAuthStore()

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData((pre)=>({
      ...pre,
      [name] : value
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    login(formData)
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-3 sm:p-10">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MdOutlineMessage className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">



            <div className=" flex  items-center space-x-2">
                <label className="floating-label">
                    <span>Email</span>
                    <GoMail size={18} className="absolute top-2.5 left-1 z-20 text-gray-700"  />
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={formData.email}
                      className="input input-md ps-8 pe-6"
                      onChange={handleChange}
                    />
                </label>
            </div>

            <div className=" flex items-center space-x-2">
                
                <label className="floating-label relative">
                    <span>Password</span>
                    <PiPassword size={18} className="absolute top-3 left-1 z-20 text-gray-700" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        name="password"
                        value={formData.password}
                        className="input input-md ps-8 pe-6"
                        onChange={handleChange}
                      />
                      {formData.password.length > 0 && (
                      <div 
                          className="absolute top-3 right-1 z-20"
                          onClick={()=> setShowPassword(pre => !pre)}>
                        {showPassword 
                        ? (<FaRegEyeSlash size={17} className="text-gray-700" />
                          ) 
                        : (<FaRegEye size={17} className="text-gray-700" />
                          )
                        }
                      </div>
                      )}
                </label>
            </div>
                      
            <div className="flex items-center">
               <button type="submit" className="btn btn-primary px-15" disabled={isLoggingIn}>
                  {isLoggingIn 
                    ?( <LoadingSpin />)
                    : "Sign in"
                  }
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to='/signup' className="link link-primary" >SignUp</Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern 
          title="Join our community"
          subtitle="Connect with friends, share momens, and stay in tuch with your loved ones" />
    </main>
  )
}

export default LoginPage
