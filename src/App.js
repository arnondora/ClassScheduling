import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import fordFulkerson from './utils/fordFulkerson'

import SubjectList from './components/SubjectList'

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
    this.state = {
      teachers : [],
      subjects : [],
    }
  }
  render() {
      var graph = [
  	[
  		0, 16, 13, 0, 0, 0
  	], [
  		0, 0, 10, 12, 0, 0
  	], [
  		0, 4, 0, 0, 14, 0
  	], [
  		0, 0, 9, 0, 0, 20
  	], [
  		0, 0, 0, 7, 0, 4
  	], [
  		0, 0, 0, 0, 0, 0
  	]
  ]
  console.log("The maximum possible flow is " +
  	fordFulkerson(graph, 0, 5))

    return (
      <Container>
        <SubjectList handleOnChange={this.handleTeacherChange.bind(this)} handleOnSubmit={this.handleTeacherOnSubmit.bind(this)} fieldVal={this.state.currentTeacherName} teachers={this.state.teachers}/>
      </Container>
    );
  }

  handleTeacherOnSubmit (e) {
    e.preventDefault()
    var newTeacherList = this.state.teachers
    newTeacherList.push(this.state.currentTeacherName)

    this.setState({
      teachers : newTeacherList,
      currentTeacherName : ""
    })
  }

  handleTeacherChange (e) {
    this.setState({
      currentTeacherName: e.target.value
    })
  }
}

export default App;
