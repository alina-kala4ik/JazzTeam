import React, {useRef} from "react";

const createInput = (header, headers, data) => {
  return (
    <label key={headers[header]}>
      <p>{headers[header]}: </p>
      <input defaultValue={data[header]} className="editing_input" type="text"/>
    </label>
  )
}

const Editing = (props) => {
  const {headers, data, closeEditingModal} = props;

  const formRef = useRef(null);

  const headersArr = Object.keys(headers);

  return (
    <div className="editing">
      <form className="editing_form" ref={formRef}>
        <button
          className="editing_close"
          type="button"
          onClick={closeEditingModal}
        />

        <p className="editing_title">Редактирование личной информации</p>

        {headersArr.map(header => {
          return createInput(header, headers, data)
        })}

        <button
          onClick={(evt) => {
            evt.preventDefault();
            const data = new FormData(formRef.current);
            console.log(data)
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

export default Editing;
