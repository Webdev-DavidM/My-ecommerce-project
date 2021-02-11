/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from '../NavBar.module.css';
import { CSSTransition } from 'react-transition-group';

/* Action creators */

import { returnAllProducts, searchProducts } from '../../Actions/products.js';

class SearchBar extends Component {
  state = {
    showResults: false,
    input: '',
  };
  componentDidMount = () => {
    this.props.getProducts();
  };

  userInput = (e) => {
    this.setState((prevState) => ({
      showResults: true,
      input: e.target.value,
    }));
    if (e.target.value.length > 1) {
      this.props.search(e.target.value);
    }
    if (e.target.value.length === 0) {
      this.props.getProducts();
      this.setState({ showResults: false });
    }
    if (this.state.input.length > e.target.value.length) {
      this.props.search(e.target.value);
    }
  };

  render() {
    let { products } = this.props;

    return (
      <>
        <div className={styles.search}>
          <input
            onChange={(e) => this.userInput(e)}
            type='text'
            id='fname'
            name='fname'></input>
          <div className={styles.searchicon}>
            <i className='fas fa-search '></i>{' '}
          </div>
          <CSSTransition
            in={this.state.showResults}
            timeout={500}
            classNames='searchresultsdropdown'
            unmountOnExit>
            <div className={styles.results}>
              {' '}
              {this.props.products &&
                this.props.products.map((product) => (
                  <div
                    onClick={() =>
                      this.props.history.push(`/product/${product._id}`)
                    }>
                    {product.name}
                    <hr />
                  </div>
                ))}
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.searchProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(returnAllProducts()),
    search: (e) => dispatch(searchProducts(e)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
