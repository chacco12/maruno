'use client';


import { useState, useEffect } from "react";
import { answer } from '@prisma/client';
import { useRouter } from 'next/navigation'

const Result = ({ params }: { params: { answer_id: string } }) => {

  const answer_id = params.answer_id
  const [title, setTitle] = useState<string>("");
  const [input, setInput] = useState<number[]>([]);

  const [answer, setAnswer] = useState<number[]>([]);
  const [count, setCount] = useState<number>(1);

  const router = useRouter();
  const [result, setResult] = useState<number[]>([]);
  const [result_mark, setResult_mark] = useState<string[]>([]);

  const getAnswer = async () => {
    console.log(">>>GETにfetchするよ")
    try {
      const res = await fetch("../api/answer")

      console.log(">>>GETにfetchしたよ")

      const data = await res.json();
      setTitle(data.title)
      setInput(data.input)
      setResult(data.result)
    } catch (err) {
      alert("getAnswer()失敗")
    }
  }




  const addResult = (x: number) => {
    setResult([...result, x]);
    if(x==0){
    setResult_mark([...result_mark, "〇"]);
    }
    if(x==1){
      setResult_mark([...result_mark, "×"]);
      }

    
    if (result.length > 10) {
      const tableElment: HTMLTableElement = document.getElementById('tt') as HTMLTableElement;
      tableElment.scrollIntoView(false);
    }
  };

  const finish = async () => {
    try {
      console.log(">>>PUTするよ")
      const res = await fetch("../api/answer", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answer_id:answer_id,
          input: input,
          answer: null,
          result: result,
          step: 1,
        })
      })
      const jsonResponse = await res.json();

      router.push(`/result/${jsonResponse.answer_id}`)
    } catch (err) {
      alert("失敗")
    }
  }



  useEffect(()=>{
    getAnswer()
  },[])
  

  return (

    <div className="all">
      <h1>MARUTSUKE App</h1>
      <div>
        <p>{title}</p>
        <br /><br /><br />
        <div className="data">
          <table id="tt">
            <tbody>
              {result.map((result, index) => {
                return <tr key={index}>
                  <td>( {index + 1} ) </td><td>{input[index]}</td><td>{result}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>

        <br />
        <div className="cl">
          
          <br />
          <button className="finish-button" onClick={finish}>終了</button>
        </div>

      </div>
    </div>

  )
}

export default Result;