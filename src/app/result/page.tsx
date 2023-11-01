'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<string[][]>([[]]);

  // "〇" の数をカウントする関数
  const countMaru = (data: string[][]): number => {
    let count = 0;
    data.forEach((row) => {
      if (row[2] === "〇") {
        count++;
      }
    });
    return count;
  };

  const maruCount = countMaru(tableData); // "〇" の数をカウント

  const rowCount = tableData.length; // テーブルの行数を取得

  const passRate = maruCount/rowCount*100

  const finish = () => {
    router.push("/")
  };

  useEffect(() => {
    const resultJson = localStorage.getItem("result");
    if (resultJson) {
      const parsedResult = JSON.parse(resultJson);
      setTableData(parsedResult);
    }
  }, []);

  return (
    <div>
      <h1>Result Page</h1>

      <h2>正解率： {passRate} %</h2>
      <p> 正解数： {maruCount}　　問題数： {rowCount}</p>
      <table id="tt">
        <thead>
          <tr>
            <th>問題番号</th>
            <th>回答</th>
            <th>正誤</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={finish}>終了</button>
    </div>

  );
};

export default ResultPage;
