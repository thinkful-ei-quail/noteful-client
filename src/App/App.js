import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
//import dummyStore from "../dummy-store";
import NotesContext from "../NotesContext";

import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  //static contextType = NotesContext;

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  componentDidMount() {
    // fake date loading from API call
    //setTimeout(() => this.setState(dummyStore), 600);
    Promise.all([
      fetch("http://localhost:9090/notes"),
      fetch("http://localhost:9090/folders"),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) {
          return notesRes.json().then((e) => Promise.reject(e));
        }
        if (!foldersRes.ok) {
          return foldersRes.json().then((e) => Promise.reject(e));
        }

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  renderNavRoutes() {
    //const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    //const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
    };
    //const values = { ...this.state };
    return (
      <NotesContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;

/*
<NoteListNav
                folders={this.context.folders}
                notes={this.context.notes}
                {...routeProps} 
</NoteListNav>
*/
