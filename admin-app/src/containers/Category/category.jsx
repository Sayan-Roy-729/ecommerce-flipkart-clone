import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addCategory, getAllCategory } from '../../actions';
import Layout from '../../components/layout/index';
import Input from '../../components/UI/Input/index';
import MyModal from '../../components/UI/Modal/Modal';

const Category = (props) => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Redux
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleClose = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

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

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

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
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong htmlFor="">Category Name</strong>
          <Input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
          <select
            className="form-control"
            name=""
            id=""
            value={parentCategoryId}
            onChange={(event) => setParentCategoryId(event.target.value)}
          >
            <option value="">Select Category</option>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Layout>
  );
};
export default Category;
