import React, { Fragment, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createMarket } from "../graphql/mutations";
import { Form, Field, Input } from 'semantic-ui-react'

// Context
import { UserContext } from "../App";

// Components
import Modal from "../components/Modal";

const NewMarket = () => {
  
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    owner: null,
    name: "",
    selectedTags: []
  });
  const [tags, setTags] = useState([
    "Technology", "Outdoors", "Entertainment", "Recreation"
  ]);

  let { name, selectedTags } = formData;
  
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
      console.log(formData);
      // const result = await API.graphql(graphqlOperation(createMarket, { formData }));
      // console.log(result.data.createMarket.id);
    }
    catch (err) {
      throw err;
    }
  }

  const handleTagChange = (e) => {
    let { value } = e.target;
    let tags = [...selectedTags, value];
    setFormData({
      ...formData,
      selectedTags: tags
    });
  }

  const showSelectedTags = () => {
    return(
      <div>
        {selectedTags.length === 1 ?
          <h3>Selected Tag</h3> :
          <h3>Selected Tags</h3>
        }
        {sortTags(selectedTags).map((tag) => {
          return(
            <div key={`selected${tag}`}>
              <span>{tag}</span>
              <button onClick={() => removeSelectedTags(tag)}>&times;</button>
            </div>
          )
        })}
      </div>
    )
  }

  const removeSelectedTags = (deleteTag) => {
    let filtered = selectedTags.filter((tag) => {
      return deleteTag !== tag;
    });
    setFormData({
      ...formData,
      selectedTags: filtered
    });
  }

  const sortTags = (tags) => tags.sort();
  
  return(
    <Fragment>
      <h1>Create New</h1>
      <button onClick={() => setModal(true)}>Add New</button>
      {modal &&
        <Modal closeModal={closeModal}>

          <Form onSubmit={(e) => handleAddNew(e)}>
            <Form.Field>
              <Input label="Name of Market" onChange={(e) => setFormData({ ...formData, name: e.target.value }) } />
            </Form.Field>
            <Form.Field>
              <label>Add Tags</label>
              <select name="tags" defaultValue={"default"} onChange={(e) => handleTagChange(e)}>
                <option disabled={true} value={"default"}>Select Tag</option>
                {sortTags(tags).map(tag => {
                  return(
                    <option key={`option${tag}`} value={tag}>{tag}</option>
                  )  
                })}
              </select>
            </Form.Field>
            {selectedTags.length > 0 &&
              <Form.Field>
                {showSelectedTags()}
              </Form.Field>
            }
            <Form.Field>
              <button disabled={!name.length > 0}>Add!</button>
              <button onClick={() => setModal(false)}>Cancel</button>
            </Form.Field>
          </Form>
        </Modal>
      }
    </Fragment>
  )
}

export default NewMarket;
