import React, { useEffect, useState } from "react"
import db from "../firebase/firebaseConfig"

const TestFirebase = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection("test-collection").get()
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Firebase Test Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default TestFirebase
