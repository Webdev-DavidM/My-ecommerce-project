/* NPM packages */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

/* CSS */

import styles from './Products.module.css';

/* Components */

import MobileProductFilterMenu from '../Components/UIelements/MobileProductFilterMenu';
import ProductItem from '../Components/UIelements/ProductItem';
import ProductFilters from '../Components/UIelements/ProductFilters';

/* Action creators */
import {
  getProducts,
  productBrands,
  clearSelectedProduct,
} from '../Actions/products.js';

class Products extends Component {
  state = {
    showFilterMenu: false,
  };

  componentDidMount = () => {
    let { getUserProducts, clearSelected } = this.props;
    let { category } = this.props.match.params;
    clearSelected();
    getUserProducts(category);
  };

  componentDidUpdate = () => {
    //If the user refreshes the page this will get the brands and give them to the brand filter
    let { filterBrands } = this.props;
    let { subcat } = this.props.match.params;
    let { products } = this.props;

    // This will filter the products via category and then create a list of brands which the brand filter can use to
    // populate buttons names
    // Below will create a list of the brands from the bikes available and make sure no
    // brands is duplicated
    let productToFilter = products.filter(
      (product) => product.subcategory === subcat
    );
    let brands = productToFilter.reduce((brandArray, product) => {
      if (brandArray.includes(product.brand) === false) {
        brandArray.push(product.brand);
      }
      return brandArray;
    }, []);

    filterBrands(brands);
  };

  render() {
    let { subcat, type, category } = this.props.match.params;

    let { products } = this.props;

    let productsToDisplay = products.filter(
      (product) => product.subcategory === subcat
    );

    productsToDisplay = productsToDisplay.map((product, index) => (
      <ProductItem details={product} key={index} />
    ));

    return (
      <>
        <div className={styles.products}>
          <div>
            <span
              className={styles.gobackbtn}
              onClick={() => this.props.history.goBack()}>
              Go back
            </span>
            <p className={styles.route}>
              You are here: <Link to={`/${category}`}>{category}</Link>: {type}{' '}
              : {subcat}
            </p>
          </div>
          <Media
            query='(max-width: 768px)'
            render={() => (
              <CSSTransition
                in={this.state.showFilterMenu}
                timeout={300}
                classNames='mobilefilter'
                unmountOnExit>
                <MobileProductFilterMenu />
              </CSSTransition>
            )}
          />
        </div>

        <Media
          query='(min-width: 768px)'
          render={() => <ProductFilters products={products} />}
        />

        <div className={styles.productitems}>{productsToDisplay}</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProducts: (category) => dispatch(getProducts(category)),
    filterBrands: (brands) => dispatch(productBrands(brands)),
    clearSelected: () => dispatch(clearSelectedProduct()),
  };
};

const mapStatetoProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Products);
