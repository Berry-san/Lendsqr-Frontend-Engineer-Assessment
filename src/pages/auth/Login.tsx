import React, { useState } from 'react'
import './Login.scss'
import lendsqrLogo from '../../assets/icons/lendsqrLogo.svg'
import illustration from '../../assets/images/illustration.png'

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="containers">
      {/* Left Section with Image - Hidden on small screens */}
      <div className="left-section">
        <div className="content">
          <img src={lendsqrLogo} alt="Lendsqr Logo" className="logo" />
          <img src={illustration} alt="Illustration" className="illustration" />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="right-section">
        <div className="login-form">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form>
            <div className="input-group">
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <a href="/forgot-password" className="forgot-password">
              FORGOT PASSWORD?
            </a>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
