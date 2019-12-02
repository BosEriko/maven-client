import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'

class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      skills: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    Axios.patch(`http://localhost:4000/user/${this.props.match.params.user_id}/update`, {
      'name': this.state.name,
      'email': this.state.email,
      'skills': [this.state.skills]
    }, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      window.location.replace(`/profile/${this.props.match.params.user_id}`);
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }
  render() {
    const inputFieldStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
    const buttonStyle     = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    return (
      <div className="my-5">
        <Helmet>
          <title>Update Profile</title>
        </Helmet>
        <form>
          <input className={inputFieldStyle} onChange={this.handleChange} name="name" placeholder="Name" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="email" type="email" placeholder="Email" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="skills" placeholder="Skills" />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default ProfileUpdate;
