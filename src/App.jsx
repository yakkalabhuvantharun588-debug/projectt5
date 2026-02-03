import React, { Component } from 'react'
import './App.css'
import { APIURL, callApi } from './lib.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      showpopup: false,
      userdata: null
    }

    this.getData = this.getData.bind(this)
    this.showUserInfo = this.showUserInfo.bind(this)
    this.closeUserInfo = this.closeUserInfo.bind(this)
  }

  componentDidMount() {
    callApi("GET", APIURL, "", this.getData)
  }

  getData(res) {
    this.setState({ data: res })
  }

  showUserInfo(user) {
    this.setState({ showpopup: true, userdata: user })
  }

  closeUserInfo() {
    this.setState({ showpopup: false, userdata: null })
  }

  render() {
    const { data, showpopup, userdata } = this.state

    return (
      <div className="app">
        <div className="header">
          Example for APIs, Fetch function, Conditional Rendering
        </div>

        <div className="section">
          <h1>Welcome</h1>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map(user => (
                <tr key={user.id} onClick={() => this.showUserInfo(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          Copyright © 2026. All rights reserved.- Y. Bhuvanesh - KL University
        </div>

        {showpopup && userdata && (
          <div className="overlay">
            <div className="popup">
              <div className="popupHeader">
                <button onClick={this.closeUserInfo}>X</button>
              </div>

              <div className="popupSection">
                <p><span>ID:</span> {userdata.id}</p>
                <p><span>Name:</span> {userdata.name}</p>
                <p><span>Username:</span> {userdata.username}</p>
                <p><span>Email:</span> {userdata.email}</p>
                <p>
                  <span>Address:</span>
                  {userdata.address.street}, {userdata.address.city} - {userdata.address.zipcode}
                </p>
                <p><span>Phone:</span> {userdata.phone}</p>
                <p><span>Website:</span> {userdata.website}</p>
                <p>
                  <span>Company:</span>
                  {userdata.company.name}<br />
                  {userdata.company.bs}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
