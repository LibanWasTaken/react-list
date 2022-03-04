import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (tokenPlatformList().includes(tokenPlatform()) && !isEditing) {
      showAlert(true, "danger", "value already exists");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        company: tokenPlatform(),
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  const copy = (id) => {
    const specificItem = list.find((item) => item.id === id);
    showAlert(true, "success", "copied to clipboard");
    navigator.clipboard.writeText(specificItem.title);
  };
  function tokenPlatform() {
    var par = document.getElementsByName("tokens")[0];
    var index = par.selectedIndex;
    return par.options[index].text;
  }
  function tokenPlatformList() {
    let arr = [];
    list.forEach((item) => {
      arr.push(item.company);
    });
    return arr;
  }

  function submit() {}
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="token-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Tokens</h3>
        <div className="form-control">
          <select className="token-select" name="tokens" id="tokens">
            <option value="GitHub">GitHub</option>
            <option value="GitLab">GitLab</option>
            <option value="Jira">Jira</option>
            <option value="BitBucket">BitBucket</option>
          </select>
          <input
            type="text"
            className="token"
            placeholder="Place your token"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="token-container">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            copy={copy}
          />
          {/* <button className="clear-btn" onClick={clearList}>
            clear items
          </button> */}
          <button className="clear-btn" onClick={submit}>
            Submit
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
