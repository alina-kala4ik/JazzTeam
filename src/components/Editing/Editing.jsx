import React, {useRef} from "react";
import PropTypes from "prop-types";

const createInput = (header, headers, data) => {
  return (
    <label key={headers[header]}>
      <p>{headers[header]}: </p>
      <input name={header} defaultValue={data[header]} className="editing_input" type="text"/>
    </label>
  )
}

const Editing = (props) => {
  const {headers, data, closeEditingModal, editContact} = props;

  const formRef = useRef(null);

  const headersArr = Object.keys(headers);

  return (
    <div className="editing">
      <form className="editing_form" ref={formRef}>
        <button
          className="editing_close"
          type="button"
          onClick={() => {closeEditingModal(null)}}
        />

        <p className="editing_title">Редактирование личной информации</p>

        {headersArr.map(header => {
          return createInput(header, headers, data)
        })}

        <button
          onClick={(evt) => {
            evt.preventDefault();
            const formData = new FormData(formRef.current);
            const dataInObj = Object.fromEntries(formData);
            dataInObj.id = data.id;
            editContact(dataInObj);
            closeEditingModal(null);
          }}
          className="editing_save"
          type="button"
        >
          Сохранить
        </button>
      </form>
    </div>
  )
}

Editing.propTypes = {
  headers: PropTypes.object,
  data: PropTypes.object,
  closeEditingModal: PropTypes.func,
  editContact: PropTypes.func
}

export default Editing;
