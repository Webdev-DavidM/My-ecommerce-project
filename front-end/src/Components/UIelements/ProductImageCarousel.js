import styles from './ProductImageCarousel.module.css';
import React, { Component } from 'react';
import Media from 'react-media';

import FilterButton from './FilterButton';

export default class ProductImageCarousel extends Component {
  state = {
    productId: '',
    images: ['cycle-slide1.jpg', 'cycle-slide2.png', 'cycling-desktop2.jpg'],
    selectedImage: 1,
  };

  componentDidMount = () => {
    // Here i will put the images props into state, for now i am hard coding them.
  };

  moveImageByArrow = (direction) => {
    if (direction === 'left' && this.state.selectedImage !== 0) {
      return this.setState((prevState) => ({
        selectedImage: prevState.selectedImage - 1,
      }));
    } else if (
      direction === 'right' &&
      this.state.selectedImage !== this.state.images.length - 1
    ) {
      return this.setState((prevState) => ({
        selectedImage: prevState.selectedImage + 1,
      }));
    }
  };

  moveImagesByDot = (index) => {
    this.setState((prevState) => ({
      selectedImage: index,
    }));
  };

  render() {
    let imageButtons = this.state.images.map((image, index) => (
      <span
        className={styles.dot}
        onClick={() => this.moveImagesByDot(index)}
        style={
          index === this.state.selectedImage
            ? { backgroundColor: '#f1c40f' }
            : null
        }></span>
    ));

    let imageGallery = this.state.images.map((image, index) => (
      <span
        onClick={() => this.moveImagesByDot(index)}
        style={
          index === this.state.selectedImage
            ? { border: '3px solid #f1c40f' }
            : null
        }>
        <img
          src={`${process.env.PUBLIC_URL}/images/${image}`}
          alt={'hello'}></img>
      </span>
    ));

    return (
      <>
        <div className={styles.slideshowcontainer}>
          <div className={`${styles.myslides} ${styles.fade}`}>
            <button
              disabled={this.state.selectedImage === 0}
              className={styles.prev}
              onClick={() => this.moveImageByArrow('left')}>
              <i class='fas fa-angle-left'></i>
            </button>
            <img
              src={`${process.env.PUBLIC_URL}/images/${
                this.state.images[this.state.selectedImage]
              }`}
              alt={'hello'}></img>
            <button
              className={styles.next}
              onClick={() => this.moveImageByArrow('right')}>
              <i class='fas fa-angle-right'></i>
            </button>
          </div>
        </div>
        <br></br>
        <div style={{ textAlign: 'center' }}>
          {' '}
          <i class='fas fa-angle-left'></i> &nbsp;{this.state.selectedImage}{' '}
          &nbsp; / &nbsp; {this.state.images.length - 1} &nbsp;
          <i class='fas fa-angle-right'></i>
        </div>
        <Media
          query={'(max-width: 768px)'}
          render={() => (
            <div style={{ textAlign: 'center' }}>{imageButtons}</div>
          )}
        />
        <Media
          query={'(min-width: 768px)'}
          render={() => (
            <div
              className={styles.imagegallery}
              style={{ textAlign: 'center' }}>
              {imageGallery}
            </div>
          )}
        />
      </>
    );
  }
}
