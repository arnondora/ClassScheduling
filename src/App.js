import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import fordFulkerson from './utils/fordFulkerson'
import firebase from './utils/firebase'
import TeacherList from './components/TeacherList'
import TimeAssignList from './components/TimeAssignList'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  html,h1,h2,h3,h4,p,span {
    font-family: 'Open Sans';
  }
`

const Container = styled.div`
  display: flex;
  flex-direction:column;
  width:90%;
  margin: 0 auto;
`
class App extends React.Component {
  constructor () {
    super()

    //Remove old Data
    const timeslotRef = firebase.database().ref('timeslots')
    timeslotRef.remove()

    const timeOfDaySlot = ['Morning', 'Afternoon']
    const dayOfWeekSlot = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const timeslots = []

    timeOfDaySlot.forEach((timeSlot,index) => {
      dayOfWeekSlot.forEach ((daySlot, index) => {
        timeslotRef.push({day: daySlot, time:timeSlot})
        timeslots.push({day: daySlot, time:timeSlot})
      })
    })

    this.state = {
      teachers : [],
      timeslots : timeslots,
      preferTimeList: [],
      currentTimeSlot: null,
      currentTeacher: null
    }
  }

  componentDidMount () {
    const teacherRef = firebase.database().ref('teachers')

    teacherRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newList = []
      for (let item in items) {
        newList.push({
          id: item,
          name: items[item].name
        })
      }

      this.setState({
        teachers: newList
      })
    })

    const slotRef = firebase.database().ref('timeslots')
    slotRef.on('value', (snapshot) => {
      let timeslotItems = snapshot.val()
      let slots = []

      for (let item in timeslotItems) {
        slots.push({
          id: item,
          day: timeslotItems[item].day,
          time: timeslotItems[item].time
        })
      }

      this.setState({
        timeslots : slots
      })
    })
  }
  render() {
      var graph = [
  	[
  		0, 2, 1, 0, 0, 0
  	], [
  		0, 0, 0, 1, 1, 0
  	], [
  		0, 0, 0, 0, 1, 0
  	], [
  		0, 0, 0, 0, 0, 1
  	], [
  		0, 0, 0, 0, 0, 2
  	], [
  		0, 0, 0, 0, 0, 0
  	]
  ]
  console.log("The maximum possible flow is " +
  	fordFulkerson(graph, 0, 5))

    console.log(this.state.preferTimeList)
    return (
      <Container>
        <TeacherList
          handleOnChange={this.handleTeacherChange.bind(this)}
          handleOnSubmit={this.handleTeacherOnSubmit.bind(this)}
          fieldVal={this.state.currentTeacherName}
          teachers={this.state.teachers}/>

        <TimeAssignList
          teachers={this.state.teachers}
          timeslots={this.state.timeslots}
          prefertimeList = {this.state.preferTimeList}
          handleTimeSlotChange={this.handleTimeslotTimeChange.bind(this)}
          handleTeacherChange={this.handleTeacherTimeChange.bind(this)}
          handlePreferedTimeOnsubmit={this.handlePreferedTimeOnsubmit.bind(this)}
          currentTimeslot = {this.state.currentTimeSlot}
          currentTeacher = {this.state.currentTeacher}
        />

        <h1>
          Other Options
        </h1>
        <span>Number of room : </span>
      </Container>
    );
  }

  handleTeacherOnSubmit (e) {
    e.preventDefault()
    var newTeacherList = this.state.teachers
    newTeacherList.push(this.state.currentTeacherName)
    const nameRef = firebase.database().ref('teachers')
    nameRef.push({name : this.state.currentTeacherName})
  }

  handleTeacherChange (e) {
    this.setState({
      currentTeacherName: e.target.value
    })
  }

  handleTimeslotTimeChange (event,index,value) {
    this.setState({
      currentTimeSlot: value
    })
  }

  handleTeacherTimeChange (event,index,value) {
    this.setState({
      currentTeacher: value
    })
  }

  handlePreferedTimeOnsubmit (e) {
    e.preventDefault()
    var newPreferTimeList = this.state.preferTimeList
    newPreferTimeList.push({name: this.state.currentTeacher, time: this.state.currentTimeSlot})

    this.setState({
      preferTimeList: newPreferTimeList
    })
  }
}

export default App;
