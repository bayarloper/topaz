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
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Number</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2">{request.id}</td>
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
  );
};

export default RequestsTable;
