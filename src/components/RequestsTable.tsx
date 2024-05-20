// components/RequestsTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/personReq")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex flex-col items-center justify-center">
        <img src="vector1.png" alt="Customer" className="w-full h-full mb-4" />
        <p className="text-left text-sm font-medium">
          Хэвтэн эмчлүүлэгчийн бэлдэх материал та дараах зөвлөмжийн дагуу өөрийн
          хувийн бэлтгэлээ хангана уу.
        </p>
      </div>
      <div className="overflow-x-auto flex justify-center">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Хэрэгсэл</th>
              <th className="border border-gray-300 px-4 py-2">Тоо ширхэг</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {request.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;
