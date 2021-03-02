import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.css';
import { getAllCategory } from '../../actions/index';

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
