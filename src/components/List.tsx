import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type PropsType = {
  list: any[];
  deleteItem: Function;
  editItem: Function;
};
const List = (props: PropsType) => {
  const { list, deleteItem, editItem } = props;
  return (
    <div className='grocery-list'>
      {list.map((item) => {
        const { title, id } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
