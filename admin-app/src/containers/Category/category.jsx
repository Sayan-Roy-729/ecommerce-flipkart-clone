import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

import { addCategory, updateCategories } from '../../actions';
import Layout from '../../components/layout/index';
import Input from '../../components/UI/Input/index';
import MyModal from '../../components/UI/Modal/Modal';
// import createCategoryList from '../../components/CategoryList/CategoryList';

const Category = (props) => {
  // ! State handling for input fields
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

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
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  // ! Image input handler
  const categoryImageHandler = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  // ! create category list
  const createCategoryList = (categories, options = []) => {
    // console.log('Inside the function', categories);
    for (let category of categories) {
      // console.log('Inside the for loop', category);
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
    });

    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
    });
    console.log('Form handler');
    dispatch(updateCategories(form));

    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoriesModal = () => {
    return (
      <MyModal
        show={updateCategoryModal}
        onHide={() => setUpdateCategoryModal(false)}
        modalTitle="Update Categories"
        onClick={updateCategoriesForm}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <strong htmlFor="">Category Name</strong>
                  <Input
                    type="text"
                    placeholder="Category Name"
                    value={item.name}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  />
                </Col>
                <Col>
                  <strong htmlFor="">Select Category</strong>
                  <select
                    className="form-control"
                    name=""
                    id=""
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
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
                </Col>
                <Col>
                  <strong htmlFor="">Select Category</strong>
                  <select
                    className="form-control"
                    name=""
                    id=""
                    value={parentCategoryId}
                    onChange={(event) =>
                      setParentCategoryId(event.target.value)
                    }
                  >
                    <option value="none" selected hidden>
                      Select Type
                    </option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}
        <h6 style={{ fontWeight: 'bold' }}>Checked Categories</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <strong htmlFor="">Category Name</strong>
                  <Input
                    type="text"
                    placeholder="Category Name"
                    value={item.name}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  />
                </Col>
                <Col>
                  <strong htmlFor="">Select Category</strong>
                  <select
                    className="form-control"
                    name=""
                    id=""
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
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
                </Col>
                <Col>
                  <strong htmlFor="">Select Category</strong>
                  <select
                    className="form-control"
                    name=""
                    id=""
                    value={parentCategoryId}
                    onChange={(event) =>
                      setParentCategoryId(event.target.value)
                    }
                  >
                    <option value="none" selected hidden>
                      Select Type
                    </option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}
      </MyModal>
    );
  };

  const renderAddCategoryModal = () => {
    return (
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
    );
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
            {/* <ul>{category ? renderCategories(category.categories) : null}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <MdCheckBoxOutlineBlank />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={() => {}}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>

      {/* Modal  */}
      {renderAddCategoryModal()}

      {renderUpdateCategoriesModal()}
    </Layout>
  );
};
export default Category;
