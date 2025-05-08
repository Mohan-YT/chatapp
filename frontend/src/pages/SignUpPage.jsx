import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { LoadingSpin } from "../components/Loadings";

import { MdOutlineMessage } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { PiPassword } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";




const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("FullName is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if(!formData.password.trim()) return toast.error("Password is required")
    if(formData.password.length < 6) return toast.error("Password must be atleast 6 characters")
    
    return true
  };

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData((pre)=>({
      ...pre,
      [name] : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm()
    if(success) signup(formData)
  };


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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">

            <div className=" flex  items-center space-x-2">
                <label className="floating-label">
                    <span>Full Name</span>
                    <FaRegUser size={18} className="absolute top-2.5 left-1 z-20 text-gray-700"  />
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      name="fullName"
                      value={formData.fullName}
                      className="input input-md ps-8 pe-6"
                      onChange={handleChange}
                    />
                </label>
            </div>

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
               <button type="submit" className="btn btn-primary px-15" disabled={isSigningUp}>
                  {isSigningUp 
                    ?( <LoadingSpin />)
                    : "Create Account"
                  }
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to='/login' className="link link-primary" >SignIn</Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern 
          title="Join our community"
          subtitle="Connect with friends, share momens, and stay in tuch with your loved ones" />
    </main>
  );
};

export default SignUpPage;
