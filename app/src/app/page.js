'use client'

import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

function Home () {
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/files/data')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
      })
      .catch((err) => {
        window.alert(err.message)
      })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files && files.map((f, index) => {
          return f.lines.map((line, lineIndex) =>
            (
              <tr key={`${index}-${lineIndex}`}>
                <td>{f.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            )
          )
        })}
      </tbody>
    </Table>
  )
}

export default Home
