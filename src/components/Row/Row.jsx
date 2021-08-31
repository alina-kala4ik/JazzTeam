import React from "react";

const Row = (props) => {
  const {data, openEditingModal, selectData} = props;
  const {name, phone, email, bday, socialNumber} = data;

  return (
    <tr onClick={(evt) => {
      if (evt.target.tagName === 'INPUT') {
        return;
      }
      openEditingModal(data);
    }}>
      <td>
        <input
          onChange={(evt) => {
            selectData(evt.target.checked);
          }}
          type="checkbox"
        />
      </td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{bday}</td>
      <td>{socialNumber}</td>
    </tr>
  )
}

export default Row;
