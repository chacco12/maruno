'use client';
import React from 'react'
import { useState ,useEffect } from "react";
import { useRouter } from 'next/navigation'

const Create = () => {
  
  const [user_id, setuser_id] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const finish = async () => {
    try {
      const res = await fetch("../api/user", {
        method: "POST",
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

      router.push(`/usercreate/${jsonResponse.user_id}`)
    } catch (err) {
      alert("失敗")
    }

  }
  
  return (
    <div className="all">
      <h1>MARUTSUKE App</h1>
      <br/>
      <p>ユーザー登録</p>
      <div className="title-form">
        <br /><br /><br />


        <br />
        <div>
        <input type="text" onChange={(e) => { setuser_id(e.target.value) }} />
        <input type="text" onChange={(e) => { setPassword(e.target.value) }} />
          <br />
          <br />
          <button className="finish-button" onClick={finish}>登録</button>
        </div>

      </div>
    </div>
  );
};

export default Create;
