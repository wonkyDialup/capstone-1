import React, { Component} from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { fetchProducts } from "../actions/productActions";
import {VehicleContainer} from "../StyledComponents/ProductStyle"
import "../App.css";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const productItems = this.props.products.map((product) => (
      <VehicleContainer className="col-md-4" key={product.model}>
        <div className="container">
          <a
            href={`#${product.make}`}
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          >
            <img className="productImages" src={product.image} alt={product.make} />
            <p>{product.make}</p>
            <p>{product.model}</p>
          </a>
          {/* <b>{util.formatCurrency(product.price)}</b> */}
          <form action="/cart"
            className="btn btn-primary" 
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}>
            <input type="submit" value="Rent Me">
            </input>
          </form>
        </div>
      </VehicleContainer>
    ));

    return <div className="col-md-4">{productItems}</div>;
  }
}
const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);