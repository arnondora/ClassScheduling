import React from 'react'
import styled from 'styled-components'
import { get, forEach, isEmpty, toInteger, invert } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

import {fordFulkerson, getScheduling} from '../utils/fordFulkerson'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:20px;
`

const Header = styled.h1`
  color:#434343;
  margin:0;
`

const Description = styled.p`
  color: #434343;
  margin-top:5px;
  margin-bottom: 5px;
`

const ResultContainer = styled.div`
  margin-top:20px;
`

export default class Scheduling extends React.Component {
  constructor ()
  {
    super()
    this.state = {
      result : null,
      terms: null
    }
  }
  render () {

    //interpetResult
    var sincemin = 0
    var slots = []
    var teacherInSlot = []
    var newSlot = []
    if (this.state.result !== null) {
      forEach(this.state.result, (value, key) => {
        if (toInteger(value) === -1)
        {
          teacherInSlot.push(newSlot)
          newSlot = []
          sincemin = 0
        }
        else if (key === 0 || sincemin === 0)
        {
          slots.push(this.state.terms[value])
          sincemin = sincemin + 1
        }
        else {
          newSlot.push(this.state.terms[value])
        }

      })
    }
    console.log(this.state.result)
    console.log(slots, teacherInSlot)

    var nameRows = []
    forEach(teacherInSlot, (nameList,key) => {
      var tempList = ""
      forEach(nameList, (name,key) => {
        tempList = name + ","
      })
      nameRows.push(<div> {slots[key]} -> {tempList} </div>)
    })

    console.log(nameRows)

    return (
      <Container>
        <Header>Result</Header>
        <Description>After adding nessarary information, the moment of truth is here! Click on <strong>EXECUTE</strong> button to generate the timeslot scheduling. </Description>
        <RaisedButton
          onClick={this.schedule.bind(this)}
          label="EXECUTE!"
          primary={!get(this.props,'timeslots',null) !== null && this.props.timeslots.length > 0}
          disabled={get(this.props,'timeslots',null) === null}
          style={{margin:12}}
        />

        <ResultContainer>
          <p>Timeslot -> Teacher</p>
          {nameRows}
        </ResultContainer>
      </Container>
    )
  }

  schedule () {
    var prefertimeList = this.props.prefertimeList  //The List of prefered time slot for each teacher
    var numberOfRoom = this.props.numberOfRoom      //The Number of room available for lecturing in the building

    // Find Difference Term
    var terms = []
    var counter = -1
    terms['s'] = ++counter

    forEach(prefertimeList, function(value,key){
      if(isEmpty(terms[value.name]))
      {
          counter = counter + 1
          terms[value.name] = counter
      }

      if(isEmpty(terms[value.time])) {
        counter = counter + 1
        terms[value.time] = counter
      }
    })

    terms['t'] = ++counter

    // Create Blank Graph
    var preferedGraph = []
    for (var i =0 ;i<counter+1; i++)
    {
      var newList = []
      for (var j=0; j<counter+1; j++)
      {
        newList.push(0)
      }
      preferedGraph.push(newList)
    }
    // Generate Residual Graph Based on given data
    forEach(prefertimeList, function(value,key){
      // Connect from s to teacher
      preferedGraph[terms['s']][terms[value.name]] = preferedGraph[terms['s']][terms[value.name]] + 1

      // Connect from teacher to timeslot
      preferedGraph[terms[value.name]][terms[value.time]] = 1

      // Connect from timeslot to t with no of room
      preferedGraph[terms[value.time]][terms['t']] = toInteger(numberOfRoom)
    })

    fordFulkerson(preferedGraph, terms['s'], terms['t'])

    this.setState({
      result: getScheduling(),
      terms: invert(terms)
    })
  }
}
