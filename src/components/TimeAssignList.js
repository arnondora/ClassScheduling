import React from 'react'
import styled from 'styled-components'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:30px;
`

const Header = styled.h1`
  color:#434343;
  margin:0;
`

const Header2 = styled.h2`
  color:#434343;
  margin-top: 20px;
  margin-bottom: 10px;
`

const FormContainer = styled.form`
  margin-top: 0;
  display: flex;
  align-items: baseline;

`

const SubmitButton = styled(RaisedButton)`
`

const InputContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-left:10px;

  :first-child {
    margin-left: 0;
  }
`

const InputLabel = styled.span`
  margin-right: 5px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction:column;
  margin-top:0px;
`

const ListItem = styled.div`
  margin-top:10px;
  margin-bottom: 0;

  :first-child {
    margin-top: 0
  }
`
export default class TimeAssignList extends React.Component {
  constructor () {
    super()
    this.state = {
      currentTimeSlot: null,
      currentTeacher: null
    }
  }

  render () {
    return (
      <Container>
          <Header>Prefered Timeslot</Header>
          <FormContainer>
            <InputContainer>

              <InputLabel>Teacher Name : </InputLabel>

              <SelectField
                onChange={this.props.handleTeacherChange}
                value={this.props.currentTeacher}
                floatingLabelText="Teacher"
              >

                <MenuItem value={-1} primaryText="Select Teacher List" />

                {this.props.teachers !== [] ? this.props.teachers.map((teacher) => {
                  return <MenuItem key={teacher.id} value={teacher.name} primaryText={teacher.name}/>
                }) : null}

              </SelectField>

            </InputContainer>

            <InputContainer>

              <InputLabel>Timeslot : </InputLabel>

              <SelectField
                onChange={this.props.handleTimeSlotChange}
                value={this.props.currentTimeslot}
                floatingLabelText="Timeslot">

                <MenuItem value={-1} primaryText="Select Timeslot" />

                {this.props.timeslots !== [] ? this.props.timeslots.map((timeslot) => {
                  return <MenuItem key={timeslot.id} value={timeslot.day + " " + timeslot.time} primaryText={timeslot.day + " " + timeslot.time}/>
                }) : null}

              </SelectField>
            </InputContainer>

            <InputContainer>
              <SubmitButton onClick={this.props.handlePreferedTimeOnsubmit} primary={true}>Add Timeslot</SubmitButton>
            </InputContainer>
          </FormContainer>

          <Header2>Prefered List</Header2>
          <ListContainer>
            {this.props.prefertimeList.length !== 0 ? this.props.prefertimeList.map((listItem) => {
              return <ListItem key={listItem.name + " " + listItem.time}>{listItem.name + " on " + listItem.time}</ListItem>
            }): <p>There's no prefered time.</p>}
          </ListContainer>

      </Container>
    )
  }
}
