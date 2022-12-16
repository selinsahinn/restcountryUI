import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit"
import "./App.css"
function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    loadUsersData()
  }, [])

  const loadUsersData = async () => {
    return await axios
      .get("https://restcountries.com/v2/all")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err))
  }
  console.log("data", data)

  const handleReset = () => {
    loadUsersData()
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    return await axios
      .get(`https://restcountries.com/v2/name/${value}`)
      .then((response) => {
        setData(response.data)
        setValue("")
      })
      .catch((err) => console.log(err))
  }

  const handleCapSearch = async (e) => {
    e.preventDefault()
    return await axios
      .get(`https://restcountries.com/v2/capital/${value}`)
      .then((response) => {
        setData(response.data)
        setValue("")
      })
      .catch((err) => console.log(err))
  }

  const handleFilter = async (value) => {
    return await axios
      .get(`https://restcountries.com/v2/region/${value}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <MDBContainer>
      <h3 style={{ marginTop: "20px" }} className='text-center'>
        Search Name or Capital
      </h3>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
        }}
        className='d-flex input-group w-auto'
        onSubmit={handleSearch}
      >
        <input
          style={{
            margin: "2px",
            padding: "20px",
            maxWidth: "400px",
            fontSize: "18px",
            textAlign: "center",
          }}
          type='text'
          className='form-control'
          placeholder='Search...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtn
          type='submit'
          color='dark'
          style={{
            margin: "2px",
            padding: "10px",
            maxWidth: "120px",
            fontSize: "12px",
            textAlign: "center",
          }}
          onClick={handleSearch}
        >
          Search Name
        </MDBBtn>
        <MDBBtn
          type='submit'
          color='dark'
          style={{
            margin: "2px",
            border: "10px",
            padding: "10px",
            maxWidth: "120px",
            fontSize: "12px",
            textAlign: "center",
          }}
          onClick={handleCapSearch}
        >
          Search Capital
        </MDBBtn>
        <MDBBtn
          className='mx-2'
          color='danger'
          style={{
            margin: "2px",
            padding: "10px",
            maxWidth: "120px",
            fontSize: "12px",
            textAlign: "center",
          }}
          onClick={() => handleReset()}
        >
          Reset
        </MDBBtn>
      </form>

      <form
        id='capSearch'
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
        }}
        className='d-flex input-group w-auto'
        onSubmit={handleCapSearch}
      ></form>

      <MDBRow style={{ margin: "auto", display: "flex" }}>
        <h3 style={{ marginLeft: "42%", marginRight: "42%" }}>
          Filter By Region
        </h3>
        <MDBCol size='4' style={{ marginLeft: "25%", marginRight: "25%" }}>
          <MDBBtnGroup style={{ margin: "auto" }}>
            <MDBBtn color='success' onClick={() => handleFilter("Asia")}>
              Asia
            </MDBBtn>
            <MDBBtn
              color='primary'
              style={{ marginLeft: "4px" }}
              onClick={() => handleFilter("Europe")}
            >
              Europe
            </MDBBtn>
            <MDBBtn
              color='warning'
              style={{ marginLeft: "4px" }}
              onClick={() => handleFilter("Africa")}
            >
              Africa
            </MDBBtn>
            <MDBBtn
              color='info'
              style={{ marginLeft: "4px" }}
              onClick={() => handleFilter("Americas")}
            >
              Americas
            </MDBBtn>
            <MDBBtn
              color='success'
              style={{ marginLeft: "4px" }}
              onClick={() => handleFilter("Oceania")}
            >
              Oceania
            </MDBBtn>
            <MDBBtn
              color='primary'
              style={{ marginLeft: "4px" }}
              onClick={() => handleFilter("Antarctic")}
            >
              Antarctic
            </MDBBtn>
            <MDBBtn
              color='danger'
              style={{ marginLeft: "4px" }}
              onClick={() => handleReset()}
            >
              Reset
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>

      <div style={{ marginTop: "100px" }}>
        <h2 className='text-center'>COUNTRY APP </h2>
        <MDBRow>
          <MDBCol size='12'>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Capital</th>
                  <th scope='col'>Region</th>
                  <th scope='col'>Flag</th>
                  <th scope='col'>Population</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={8} className='text-center mb-0'>
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((country, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index + 1}</th>
                      <td>{country.name}</td>
                      <td>{country.capital}</td>
                      <td>{country.region}</td>
                      <td>
                        <img
                          src={country.flag}
                          alt={country.name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{(country.population / 1000000).toFixed(1)}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  )
}

export default App
