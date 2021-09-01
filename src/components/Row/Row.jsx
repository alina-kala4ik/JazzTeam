import React from "react";
import PropTypes from "prop-types";

const Row = (props) => {
  const {data, openEditingModal = () => {}, selectData = () => {}, withCheckbox = true} = props;
  const {name, phone, email, bday, socialNumber} = data;

  return (
    <tr onClick={(evt) => {
      if (evt.target.tagName === 'INPUT') {
        return;
      }
      openEditingModal(data);
    }}>
      <td>
        {withCheckbox &&
          <input
            onChange={(evt) => {
              selectData(evt.target.checked);
            }}
            type="checkbox"
          />
        }
      </td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{bday}</td>
      <td>{socialNumber}</td>
    </tr>
  )
}

Row.propTypes = {
  data: PropTypes.object,
  openEditingModal: PropTypes.func,
  selectData: PropTypes.func,
  withCheckbox: PropTypes.bool
}

export default Row;
