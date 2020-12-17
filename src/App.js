// Feature 1
import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
    this.sizeChange = this.sizeChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
  }
  sortChange (e) {
    const sort = e.target.value;
    this.setState((state)=> ({
      sort : sort,
      products : this.state.products.slice().sort((a,b)=>
        sort === "lowest" ?
        a.price > b.price ? 1 : -1
        : sort === "highest" ?
        a.price < b.price ? 1 : -1
        : a._id > b._id ? 1 : -1
       ),
     }));
  }
  sizeChange (e) {
    if(e.target.value === ""){
      this.setState({
        size : e.target.value,
        products : data.products
      })
    }
    else{
      this.setState({
        size : e.target.value,
        products : data.products.filter((product)=>product.availableSizes.indexOf(e.target.value)>=0)
      })
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/#">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              sortChange={this.sortChange}
              sizeChange={this.sizeChange}
              />
              <Products products={this.state.products}/>
            </div>
            <div className="sidebar">Cart Item</div>
          </div>
        </main>
        <footer>All rights is reserved</footer>
      </div>
    );
  }
}

export default App;
