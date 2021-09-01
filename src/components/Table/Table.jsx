import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import Row from "../Row/Row";
import Editing from "../Editing/Editing";
import {connect} from "react-redux";
import history from "../../history";
import {PATCHES} from "../../utils";
import {operation} from "../../reducer";
import PropTypes from "prop-types";


const Table = (props) => {
  const {user, loadContacts, contacts, editContact, headers} = props;
  const [editingData, setEditingData] = useState(null);
  const [selectedDataCount, setSelectedDataCount] = useState(0);

  if (!user) {
    history.push(PATCHES.LOGIN);
    return null;
  }

  useEffect(() => {
    loadContacts();
  }, [])

  if (!contacts) {
    return null;
  }

  const dataCount = contacts.length;

  const selectData = (isChecked) => {
    setSelectedDataCount(prevValue => isChecked ? prevValue + 1 : prevValue - 1)
  }

  return (
    <React.Fragment>
      <Header/>
      <div className="table">
        <table>
          <tbody>
          <Row data={headers} withCheckbox={false}/>

          {contacts.map(contact => {
            return (
              <Row
                key={contact.id}
                data={contact}
                openEditingModal={setEditingData}
                selectData={selectData}
              />
            )
          })}

        </tbody>
        </table>
      </div>
      <div className="table_count">
        <p>Всего: {dataCount}</p>
        <p>Отмечено: {selectedDataCount}</p>
      </div>

      {editingData &&
        <Editing
          headers={headers}
          data={editingData}
          closeEditingModal={setEditingData}
          editContact={editContact}
        />
      }

    </React.Fragment>
  )
}

Table.propTypes = {
  user: PropTypes.object,
  loadContacts: PropTypes.func,
  contacts: PropTypes.object,
  editContact: PropTypes.func,
  headers: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user,
  contacts: state.contacts,
  headers: state.headers
})

const mapDispatchToProps = (dispatch) => ({
  loadContacts() {
    dispatch(operation.loadContacts());
  },
  editContact(data) {
    dispatch(operation.editContact(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
