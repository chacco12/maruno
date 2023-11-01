'use client';
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

const Result = () => {


  const [user_id, setUserId] = useState<string | null>(localStorage.getItem("user_id"));
  const [myAnswer, setMyAnswer] = useState<number[]>([]);
  const [count, setCount] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const router = useRouter();
  // const title = localStorage.getItem("title")

  const addAnswer = (x: number) => {
    setMyAnswer([...myAnswer, x]);

    if (myAnswer.length > 10) {
      const tableElment: HTMLTableElement = document.getElementById('tt') as HTMLTableElement;
      tableElment.scrollIntoView(false);
    }
    setCount(count + 1);
  };

  const finish = async () => {
    //ローカルストレージにSET
    localStorage.setItem("myAnswer", JSON.stringify(myAnswer))
    router.push("/marutsuke/")
  }

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setUserId(id);
    }
    const today: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    const formattedDate: string = new Intl.DateTimeFormat('ja-JP', options).format(today);
    setDate(formattedDate)

  }, []); // 空の依存リストで初回レンダリング時にのみ実行

  return (
    <div>
      <h1>MARUTSUKE App</h1>
      <br />
      <br />
      <p>開始時間：{date}</p>
      <br /><br />
      <div className="input-list">
        <table id="tt">
          <tbody>
            {myAnswer.map((myAnswer, index) => {
              return <tr key={index}>
                <td>( {index + 1} ) </td><td>{myAnswer}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div>問{count}</div>

      <div className="answer-button-container">
        {[1, 2, 3, 4].map(num => (
          <button className="answer-button" key={num} onClick={() => addAnswer(num)}>
            {num}
          </button>
        ))}
      </div>
      <br />
      <br />
      <div>
        <button onClick={finish}>終了</button>
      </div>

    </div>

  );
};

export default Result;
