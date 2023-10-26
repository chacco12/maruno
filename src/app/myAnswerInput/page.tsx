'use client';
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { answer } from '@prisma/client';


const Result = () => {

  const [user_id, setUserId] = useState<string>();
  const [input, setInput] = useState<number[]>([]);
  const [count, setCount] = useState<number>(1);
  const router = useRouter();
  const title = localStorage.getItem("title")

  const addAnswer = (x: number) => {
    setInput([...input, x]);

    if (input.length > 10) {
      const tableElment: HTMLTableElement = document.getElementById('tt') as HTMLTableElement;
      tableElment.scrollIntoView(false);
    }
    setCount(count + 1);
  };

  const finish = async () => {
    //ローカルストレージにSET
    localStorage.setItem("input", JSON.stringify(input))

    //ログインユーザー
    if (user_id) {
      try {
        console.log(">>>newするよ")
        const res = await fetch("../api/answer", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user_id,
            title: title,
            input: input,
            answer: null,
            result: null,
            status: 0,
          })
        })
        const jsonResponse = await res.json();

        router.push("/marutsuke/")
      } catch (err) {
        alert("失敗")
      }
    }
    //ゲストユーザー
    router.push("/marutsuke/")
  }
  
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
        setUserId(id);
    }
}, []); // 空の依存リストで初回レンダリング時にのみ実行

  return (
    <div className="all">
      <h1>MARUTSUKE App</h1>
      <br />
      <p>{title}</p>
        <br /><br /><br />
        <div className="input-list">
          <table id="tt">
            <tbody>
              {input.map((input, index) => {
                return <tr key={index}>
                  <td>( {index + 1} ) </td><td>{input}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <div>問{count}</div>

        <br />
          <button className="finish-button" onClick={()=>addAnswer(1)}>1</button>
          <button className="finish-button" onClick={()=>addAnswer(2)}>2</button>
          <br />
          <button className="finish-button" onClick={()=>addAnswer(3)}>3</button>
          <button className="finish-button" onClick={()=>addAnswer(4)}>4</button>
        <div>

          <button className="finish-button" onClick={finish}>終了</button>
        </div>

      </div>
    
  );
};

export default Result;
