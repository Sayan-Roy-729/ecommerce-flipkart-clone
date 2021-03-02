import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addCategory } from '../../actions';
import Layout from '../../components/layout/index';
import Input from '../../components/UI/Input/index';
import MyModal from '../../components/UI/Modal/Modal';
import createCategoryList from '../../components/CategoryList/CategoryList';

const Category = (props) => {
  // ! State handling for input fields
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  // ! For Modal Show Hide
  const [show, setShow] = useState(false);

  // ! Global Category State 
  const category = useSelector((state) => state.category);

  // ! Dispatch hook
  const dispatch = useDispatch();

  // ! Handle form submit and modal close
  const handleClose = () => {
    // Create form data
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    // Submit the from
    dispatch(addCategory(form));
    setShow(false);

    // Empty the form inputs
    setCategoryName('');
    setParentCategoryId('');
    setCategoryImage('');
  };

  // ! Open modal
  const handleShow = () => setShow(true);

  // ! Display Category list
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  // ! Image input handler
  const categoryImageHandler = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{category ? renderCategories(category.categories) : null}</ul>
          </Col>
        </Row>
      </Container>

      {/* Modal  */}
      <MyModal
        show={show}
        onHide={handleClose}
        modalTitle="Add New Category"
        onClick={handleClose}
      >
        <form>
          <strong htmlFor="">Category Name</strong>
          <Input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
          <Form.Label>Select Category</Form.Label>
          <select
            className="form-control"
            name=""
            id=""
            value={parentCategoryId}
            onChange={(event) => setParentCategoryId(event.target.value)}
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
          <input
            className="form-control-file"
            type="file"
            name="categoryImage"
            accept="image/*"
            onChange={categoryImageHandler}
          />
        </form>
      </MyModal>
    </Layout>
  );
};
export default Category;
