'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'


const Maru = () => {
  const myAnswer = localStorage.getItem("myAnswer");
  const [tableData, setTableData] = useState<string[][]>([]);
  const [thirdColumnData, setThirdColumnData] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();



  const handleThirdColumnChange = (value: string, index: number) => {
    const updatedData: string[] = [...thirdColumnData];
    updatedData[index] = value;
    setThirdColumnData(updatedData);
  };

  const handleButtonClick = (value: string) => {
    console.log("Button Clicked:", value);
    // 以下の更新処理
    if (count < tableData.length) {
      const updatedData: string[][] = tableData.map((row, rowIndex) =>
        rowIndex === count ? [...row.slice(0, 2), value] : row
      );
      setTableData(updatedData);

      const updatedThirdColumnData: string[] = [...thirdColumnData];
      updatedThirdColumnData[count] = value;
      setThirdColumnData(updatedThirdColumnData);

      setCount(count + 1); // 次の問題へ移動
    }
  };

  const finish = () => {
    localStorage.setItem("result", JSON.stringify(tableData));
    // const pathname = "/result"
    // const searchParams = tableData
    // const url = `${pathname}?${searchParams}`
    router.push("/result")
  };
  

  useEffect(() => {
    if (myAnswer !== null) {
      const parsedAnswer: string[] = JSON.parse(myAnswer);
      const initialTableData: string[][] = parsedAnswer.map((answer, index) => [
        `問${index + 1}`, // 問題番号は1から始める
        answer,
        ""
      ]);
      setTableData(initialTableData);
      setThirdColumnData(new Array(parsedAnswer.length).fill(""));
    }
  }, [myAnswer]);

  return (
    <div>
      <h1>MARUTSUKE App</h1>
      <br /><br /><br />
      <table id="tt">
        <thead>
          <tr>
            <th>問題番号</th>
            <th>自分の回答</th>
            <th>正誤</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {colIndex === 0 || colIndex === 1 ? (
                    <span>{cell}</span>
                  ) : (
                    <input
                      type="text"
                      value={thirdColumnData[rowIndex] || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleThirdColumnChange(e.target.value, rowIndex)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div className="cl">
        <br />
        <div className="answer-button-container">
          <button className="answer-button" onClick={() => handleButtonClick("〇")}>〇</button>
          <button className="answer-button" onClick={() => handleButtonClick("×")}>×</button>
        </div>
        <br />
        <br />
        <button onClick={finish}>終了</button>
      </div>
    </div>
  );
};

export default Maru;
