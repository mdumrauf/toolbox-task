'use client'

import Table from 'react-bootstrap/Table'

function Home () {
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
        <tr>
          <td>file1.csv</td>
          <td>RgTya</td>
          <td>234234324</td>
          <td>7092130123213021930293132f</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Home
