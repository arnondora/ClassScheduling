import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

const Container = styled.div`
  display: flex;
  flex-direction:column;
  margin-top: 20px;
`

const Header = styled.h1`
  color:#434343;
  margin:0;
`

const SubHeader = styled.h2`
  color:#434343;
  margin-top:10px;
  margin-bottom: 0px;
`

const Description = styled.p`
  color: #434343;
  margin-top:5px;
  margin-bottom: 5px;
`

const OptionContainer = styled.div`
  display: flex;
  flex-direction:column;
`

export default class OtherOptions extends React.Component {
  render () {
    return (
      <Container>
        <Header>Other Options</Header>
        <p>In this section you can fine-tune related the parameter.</p>
        <OptionContainer>
          <SubHeader>No. of Room</SubHeader>
          <Description>This parameter represent the number of room available. (Default: 10)</Description>
          <TextField
            value = {this.props.numberOfRoom}
            onChange = {this.props.handleChangeRoom}
            type = "number"
             placeholder="Number of avaialble rooms"/>
        </OptionContainer>

        <OptionContainer>
          <SubHeader>Ignore University Regulation</SubHeader>
          <Description>This parameter protects students from having class on Wednesday Afternoon (Default: false)</Description>
          <Checkbox
            checked = {this.props.isIgnoreRegulation}
            onCheck = {this.props.handleChangeRegulation}
            label="I don't care what regulation says I want to have class on Wednesday Afternoon anyway."
          />
        </OptionContainer>
      </Container>
    )
  }
}
