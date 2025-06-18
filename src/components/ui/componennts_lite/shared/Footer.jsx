import React from 'react'
import { Link } from 'react-router'
import PrivacyPolicy from './PrivacyPolicy'
import TermsofServices from './TermsofServices'
const Footer = () => {
  return (
    <div>
        <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>© 2024 Job Hunt. All rights reserved.</p>
        <p>
          Powered by <a href="https://github.com/ankitpathak62">Aryan Gupta</a>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/TermsofServices"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer


