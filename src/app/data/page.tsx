'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'

const Input = () => {

  const [input, setInput] = useState("");
  const router = useRouter();
  sessionStorage.setItem("Input",input)
  const submit = async () => {
    router.push("/data/data2")
  }

  return (
    <div>
      <input type="text" onChange={(e) => {setInput(e.target.value)}} />
      <br />
      <button type="submit" onClick={() => submit()} >送信</button>
    </div>
  )
}
export default Input;