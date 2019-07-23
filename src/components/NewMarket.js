import React, { Fragment, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createMarket } from "../graphql/mutations";

// Context
import { UserContext } from "../App";

// Components
import Modal from "../components/Modal";

const NewMarket = () => {
  
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    owner: null,
    name: null
  });
  
  const userData = useContext(UserContext);
  let { username } = userData.currentUser;

  useEffect(() => {
    setFormData({
      ...formData,
      owner: username
    });
  }, []);

  const closeModal = () => {
    setModal(false);
  }

  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      //console.log(formData);
      const result = await API.graphql(graphqlOperation(createMarket, { formData }));
      console.log(result.data.createMarket.id);
    }
    catch (err) {
      throw err;
    }
  }

  return(
    <Fragment>
      <h1>Create New</h1>
      <button onClick={() => setModal(true)}>Add New</button>
      {modal &&
        <Modal closeModal={closeModal}>
          <form onSubmit={(e) => handleAddNew(e)}>
            <label htmlFor="marketName">Name:</label>
            <input type="text" id="marketName" onChange={(e) => setFormData({ ...formData, name: e.target.value }) }/>
            <button>Add!</button>
            <button onClick={() => setModal(false)}>Cancel</button>
          </form>
        </Modal>
      }

    </Fragment>
  )

}

export default NewMarket;
