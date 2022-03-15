import React, {Component} from "react";
import ReactAux from "../../../hoc/ReactAux/ReactAux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {


    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}</span>: {this.props.ingredients[igKey]}
                    </li>)
        });

        return (
            <ReactAux>
                <h3>Your Order</h3>
                <p>A delicious burger with the folowing ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button btnType='Succes' clicked={this.props.purchaseContinue}>Continue</Button>
            </ReactAux>
        );
    }
}

export default OrderSummary;