import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.css';
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout/Layout';
import { generatePublicUrl } from '../../urlConfig';

const ProductListPage = (props) => {
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const slug = props.match.params.slug;
    dispatch(getProductsBySlug(slug));
  }, [dispatch, props.match.params.slug]);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
              <button>view all</button>
            </div>
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => {
                return (
                  <div className="productContainer">
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt="product"
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: '5px 0' }}>{product.name}</div>
                      <div>
                        <span>4.3</span> <span>4000</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default ProductListPage;
