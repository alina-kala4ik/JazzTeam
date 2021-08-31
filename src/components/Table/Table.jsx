import React, {useState} from "react";
import Header from "../Header/Header";
import Row from "../Row/Row";
import Editing from "../Editing/Editing";
import {connect} from "react-redux";
import history from "../../history";
import {PATCHES} from "../../utils";

const contacts = {
  headers: {
    name: 'Имя',
    phone: 'Телефон',
    email: 'Email',
    bday: 'Дата рождения',
    socialNumber: 'Номер соц. страха'
  },
  data: [
    {
      id: 1,
      name: 'Елена',
      phone: '+375 46 378-90-20',
      email: 'test@mail.ru',
      bday: '12.12.2000',
      socialNumber: 7857487584
    },
    {
      id: 2,
      name: 'Петр',
      phone: '+375 46 378-90-20',
      email: 'test@mail.ru',
      bday: '12.12.2000',
      socialNumber: 7857487584
    },
    {
      id: 3,
      name: 'Василий',
      phone: '+375 46 378-90-20',
      email: 'test@mail.ru',
      bday: '12.12.2000',
      socialNumber: 7857487584
    }
  ]
}

const Table = (props) => {
  const {user} = props;

  if (!user) {
    history.push(PATCHES.LOGIN)
    return null;
  }

  const {headers, data} = contacts;

  const [editingData, setEditingData] = useState(null);
  const [selectedDataCount, setSelectedDataCount] = useState(0);

  const dataCount = data.length;

  const openEditingModal = (data) => {
    setEditingData(data)
  }

  const closeEditingModal = () => {
    setEditingData(null)
  }

  const selectData = (isChecked) => {
    setSelectedDataCount(prevValue => isChecked ? prevValue + 1 : prevValue - 1)
  }

  return (
    <React.Fragment>
      <Header/>
      <div className="table">
        <table>
          <tbody>
          <Row data={headers}/>

          {data.map(item => {
            return (
              <Row
                key={item.id}
                data={item}
                openEditingModal={openEditingModal}
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
          closeEditingModal={closeEditingModal}
        />
      }

    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Table);
