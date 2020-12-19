import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheckOut: false,
      name: "",
      email: "",
      address: "",
    };
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    };
    this.props.createOrder(order);
  };

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
          <Fade left cascade>
          <ul className="cart-items">
            {this.props.cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}
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
          </Fade>
        </div>
        {this.props.cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total{" "}
                {formatCurrency(
                  this.props.cartItems.reduce(
                    (a, c) => a + c.price * c.count,
                    0
                  )
                )}
              </div>
              <button
                onClick={() => this.setState({ showCheckOut: true })}
                className="button primary"
              >
                Procced
              </button>
            </div>
          </div>
        )}
        {this.state.showCheckOut && (
          <Fade right cascade>
          <div className="cart">
            <form onSubmit={this.createOrder}>
              <ul className="form-container">
                <li>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={this.changeInput}
                  ></input>
                </li>
                <li>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={this.changeInput}
                  ></input>
                </li>
                <li>
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    onChange={this.changeInput}
                  ></input>
                </li>
                <li>
                  <button className="button primary" type="submit">
                    Checkout
                  </button>
                </li>
              </ul>
            </form>
          </div>
          </Fade>
        )}
      </div>
    );
  }
}

export default Cart;
