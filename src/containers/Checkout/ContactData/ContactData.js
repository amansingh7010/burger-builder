import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props)
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Aman Singh',
        address: {
          street: 'Test street 1',
          zipCode: '12321',
          country: 'Canada',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }
    axios
      .post('orders.json', order)
      .then((response) => {
        // console.log(response)
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  render() {
    let form = (
      <form>
        <Input type="text" name="name" placeholder="Your Name" />
        <Input type="email" name="email" placeholder="Your Email" />
        <Input type="text" name="street" placeholder="Street" />
        <Input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER HERE
        </Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
