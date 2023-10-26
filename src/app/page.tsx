'use client';

import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'

const App = () => {
  const [title, setTitle] = useState("");
  const [welcome, setWelcome] = useState("");
  const router = useRouter();

  const determinePage = (n: number): string => {
    if (n === 1) return "/myAnswerInput";
    if (n === 2) return "/modelAnswerInput";
    return "/";
  };

  const handleStartButtonClick = async (n: number): Promise<void> => {
    try {
        localStorage.setItem("title", JSON.stringify(title));
        router.push(determinePage(n));
    } catch (err) {
        alert("失敗");
    }
  };

 useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            // `welcome`ステートの型は自動的に推論されます
            setWelcome(`"ようこそ、${user_id}さん"`);
        }
    }, []); // useEffectの依存リストが空（初回レンダリング時のみ実行）なので、警告が出ない


 return (
        <div className="all">
            <h1>Marutsuke TOP</h1>
            <div>
                <p>{welcome}</p>
                <input type="text" onChange={(e) => { setTitle(e.target.value) }} />
                <br />
                <button className="start-button" type="submit" onClick={() => handleStartButtonClick(1)}>回答の記入からスタート</button>
                <button className="start-button" type="submit" onClick={() => handleStartButtonClick(2)}>答えの記入からスタート</button>
            </div>
            <br /><br /><br />
            <button className="start-button" type="submit" onClick={() => router.push("/usercreate")}>ユーザー登録はこちら</button>
        </div>
    );
};

export default App;