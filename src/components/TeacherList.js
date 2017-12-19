import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Container = styled.div`
  display: flex;
  flex-direction:column;
  margin-top:20px;
`

const Header = styled.h1`
  color:#434343;
  margin:0;
`

const TeacherContainer = styled.div`
  margin-top:20px;
  display: flex;
  flex-direction:column;
`

const TeacherName = styled.div`
  margin:5px 5px 5px 5px;
`

const FormContainer = styled.form`
  margin-top: 20px;
`

const InputLabel = styled.span`
  margin-right: 5px;
`

const InputField = styled(TextField)`

`

const SubmitButton = styled(RaisedButton)`

`

const InputContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-top:10px;

  :first-child {
    margin-top: 0;
  }
`
export default class TeacherList extends React.Component {
  render () {
    return (
      <Container>
        <Header>Teachers</Header>
        <FormContainer>
          <InputContainer>
            <InputLabel>Teacher Name : </InputLabel>
            <InputField value={this.props.fieldVal} onChange={this.props.handleOnChange} name = "teacherName" type="text" placeholder="Teacher Name"/>
          </InputContainer>
          <InputContainer>
            <SubmitButton onClick={this.props.handleOnSubmit} primary={true}>Add</SubmitButton>
          </InputContainer>
        </FormContainer>
        <TeacherContainer>
          {this.props.teachers !== [] ? this.props.teachers.map((teacher) => {
            return <TeacherName key={teacher.id}>{teacher.name}</TeacherName>
          }) : null}
        </TeacherContainer>
      </Container>
    )
  }
}
