import React, { Component } from "react";
import formatCurrency from "../utils";

class Cart extends Component {
  render() {
    return (
      <div>
        {this.props.cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            You have {this.props.cartItems.length} items in cart
          </div>
        )}
        <div className="cart">
          <ul className="cart-items">
            {this.props.cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} * {item.count}
                    <button
                      className="button"
                      onClick={() => this.props.removeItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {this.props.cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
              Total{" "}
              {formatCurrency(
                this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
               </div>
               <button className="button primary">Procced</button>
            </div>
            
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
