import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Zoom  from "react-reveal/Zoom"
import Modal from "react-modal"

class Products extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      product : null
    }
  }

  openModal = (product) => {
    this.setState({product})
  }

  closeModal = ()=> {
    this.setState({product: null})
  }
  
  render() {
    const {product} = this.state
    return (
      <div>
        <Fade bottom cascade>
        <ul className="products">
          {this.props.products.length === 0
            ? "No Product available for given size"
            : this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img src={product.image} alt={product.title} onClick={()=>this.openModal(product)} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
        </Fade>
        {product && 
         <Modal isOpen={true} onRequestClose={this.closeModal}>
           <Zoom>
             <button className="close-modal" onClick={this.closeModal}>X</button>
             <div className="product-detail">
               <img src={product.image} alt={product.title} />
               <div className="product-details-description">
                  <p><strong>{product.title}</strong></p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes
                    {product.availableSizes.map((size)=>(
                      <span>
                        {" "}
                        <button className="button">{size}</button>
                      </span>
                    ))}
                  </p>
                  <div>
                     {formatCurrency(product.price)} {"   "}
                    <button onClick={()=>{this.props.addToCart(product); this.closeModal()}} className="button primary">Add to Cart</button>
                  </div>
               </div>
             </div>
           </Zoom>
         </Modal>
        }
      </div>
    );
  }
}

export default Products;
