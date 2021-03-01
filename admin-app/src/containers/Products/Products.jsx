import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';

import Layout from '../../components/layout';
import MyModal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/index';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory, addProduct } from '../../actions';

const Products = (props) => {
  //! required data states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPicture, setProductPicture] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [showSpinner, setShowSpinner] = useState(false);
  let addProductStatus;

  // !call dispatch to fetch categories from server
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // ! From redux
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  // ! for modal show, hide
  const [show, setShow] = useState(false);

  // !handle form submit
  const handleClose = () => {
    // Create form data
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('description', description);
    form.append('quantity', quantity);
    form.append('category', categoryId);
    for (let pic of productPicture) {
      form.append('productPicture', pic);
    }

    if (product.loading) {
      setShowSpinner(true);
    }

    if (!product.error) {
      setShowSpinner(false);
      // close the modal
      setShow(false);
    } else {
      addProductStatus = (
        <div className="text-danger">Some went wrong! Try Again</div>
      );
    }
    // dispatch the form data
    dispatch(addProduct(form));
  };

  // ! open modal
  const handleShow = () => setShow(true);

  // ! create category list
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  // ! product picture file handler
  const productPicturesHandler = (event) => {
    setProductPicture([...productPicture, ...event.target.files]);

    //  For Image preview
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>

              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>

      <MyModal
        show={show}
        onHide={handleClose}
        modalTitle="Add New Product"
        onClick={handleClose}
        spinner={showSpinner}
        infoFooter={addProductStatus}
      >
        <form>
          <Input
            label="Product Name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            label="Product Price"
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <Input
            label="Product Description"
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Input
            label="Product Quantity"
            type="number"
            placeholder="Product Quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <Form.Label>Select Category</Form.Label>
          <select
            className="form-control"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="none" selected hidden>
              Select Category
            </option>
            {createCategoryList(category.categories).map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
          <Form.Label>Choose Product Pictures</Form.Label>
          <Container>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {productPicture.length > 0
                ? selectedImages.map((pic, index) => {
                    return (
                      <Col md={3} key={index}>
                        <img
                          src={pic}
                          key={index}
                          alt="product"
                          style={{
                            width: '100%',
                            maxHeight: '150px',
                            margin: '5px',
                          }}
                        />
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Container>

          <input
            className="form-control-file"
            type="file"
            name="productPicture"
            id=""
            onChange={productPicturesHandler}
            multiple
          />
        </form>
      </MyModal>
    </Layout>
  );
};

export default React.memo(Products);
