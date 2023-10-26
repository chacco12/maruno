'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";


const Login = ({ params }: { params: { user_id: string } }) => {

  const [user_id, setuser_id] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const loginCheck = async() => {
    try {
      const res = await fetch("../api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user_id,
          password: password
        })
      })
      const jsonResponse = await res.json();
      localStorage.setItem("user_id", user_id)

      router.push(`/App/${params.user_id}`);

    } catch (err) {
      alert("失敗")
    }
  }

  return (
    <div className="all">
      <h1>MARUTSUKE App</h1>
      <br />
      <p>ログイン画面</p>
      <div className="title-form">
        <br /><br /><br />


        <br />
        <div>
          <input type="text" onChange={(e) => { setuser_id(e.target.value) }} />
          <input type="text" onChange={(e) => { setPassword(e.target.value) }} />
          <br />
          <br />
          <button className="finish-button" onClick={loginCheck}>ログイン</button>
        </div>

      </div>
    </div>
  )

};

export default Login;
