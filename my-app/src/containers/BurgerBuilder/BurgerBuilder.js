import React, { Component } from "react";

import ReactAux from "../../hoc/ReactAux/ReactAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0});
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const uppdatedCount = oldCount + 1;
        const uppdatedIngredients = {
            ...this.state.ingredients
        };
        uppdatedIngredients[type] = uppdatedCount;
        const priceAddition =INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: uppdatedIngredients});
        this.updatePurchaseState(uppdatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0) {
            return;
        }
        const uppdatedCount = oldCount - 1;
        const uppdatedIngredients = {
            ...this.state.ingredients
        };
        uppdatedIngredients[type] = uppdatedCount;
        const priceDeduction =INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: uppdatedIngredients});
        this.updatePurchaseState(uppdatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelOrder = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Continue!');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <ReactAux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelOrder}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancel={this.purchaseCancelOrder}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
                    
            </ReactAux>
        );
    }
}


export default BurgerBuilder;