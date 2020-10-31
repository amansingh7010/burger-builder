import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.7,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = this.state.ingredients[type] + 1
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return

    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchasCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasCancelHandler}
        >
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
