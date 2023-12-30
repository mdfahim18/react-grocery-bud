import { useState, useEffect } from 'react';
import Alert from './components/Alert';
import List from './components/List';

const getLocalStorage = () => {
  let groceryList = localStorage.getItem('grocery-list');
  if (groceryList) {
    return JSON.parse(groceryList);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item: any) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditing(false);
      setEditId(null);
      showAlert(true, 'success', 'value is changed');
    } else {
      showAlert(true, 'success', 'item is added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (
    show: boolean = false,
    type: string = '',
    msg: string = ''
  ) => {
    setAlert({ show, type, msg });
  };

  const deleteItem = (id: string) => {
    showAlert(true, 'danger', 'item is removed');
    setList(list.filter((item: any) => item.id !== id));
  };

  const editItem = (id: any) => {
    const specificItem = list.find((item: any) => item.id === id);
    setEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  const handleClearList = () => {
    setList([]);
    showAlert(true, 'danger', 'empty list');
  };
  useEffect(() => {
    localStorage.setItem('grocery-list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} list={list} />
        )}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List list={list} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-btn' onClick={handleClearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
