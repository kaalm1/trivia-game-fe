import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, Picker, Container, Content, Form, Item, Button} from 'native-base'

export default class HomeScreen extends React.Component {
  state = {
    selected: 'key0'
  }

  onValueChange = (value:string) => {
    this.setState({selected:value})
  }

  render () {
    return (
      <Container style={styles.container}>
        {/* <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Picker</Title>
          </Body>
          <Right />
        </Header> */}

          {/* <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange}
            >
              <Item label="Easy" value="key0" />
              <Item label="Medium" value="key1" />
              <Item label="Hard" value="key2" />
            </Picker>
          </Form> */}
          <Button block rounded success style={styles.button}>
            <Text>Easy</Text>
          </Button>
          <Button block rounded style={styles.button}>
            <Text>Medium</Text>
          </Button>
          <Button block rounded danger style={styles.button}>
            <Text>Hard</Text>
          </Button>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10
  }
});
