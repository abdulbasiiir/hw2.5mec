import React, { useState, useEffect } from 'react';

const NameList = () => {
  // Состояние для списка имён
  const [names, setNames] = useState([]);

  // Эффект для загрузки списка из localStorage при монтировании компонента
  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem('names')) || [];
    setNames(storedNames);
  }, []);

  // Функция для добавления имени
  const addName = (name) => {
    const newNames = [...names, name];
    setNames(newNames);
    // Сохраняем новый список в localStorage
    localStorage.setItem('names', JSON.stringify(newNames));
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    const nameInput = event.target.elements.nameInput.value.trim();
    if (nameInput !== '') {
      addName(nameInput);
      event.target.reset();
    }
  };

  return (
    <div>
      <h1>Список имён</h1>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nameInput" placeholder="Введите имя" />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default NameList;
