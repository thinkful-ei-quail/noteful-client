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

    //this.context.notes = [
    // const notes = [
    //   {
    //     id: "d26e12c2-ffaf-11e8-8eb2-f2801f1b9fd1",
    //     name: "Turtles",
    //     modified: "2018-09-11T23:00:00.000Z",
    //     folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
    //     content:
    //       "Fugiat dolores et nostrum laborum id delectus sint reiciendis. Recusandae nulla repellendus. Labore eum hic nesciunt enim corporis necessitatibus. Iusto pariatur aut qui blanditiis.\n \rTempore et vel ut maxime et reprehenderit deleniti esse officia. Laboriosam et reiciendis distinctio qui enim. Amet suscipit sit.\n \rVitae id impedit reprehenderit eveniet nesciunt et soluta. Labore aliquam sed dolores voluptatibus est omnis quo molestias aut. Dolor optio sed alias excepturi delectus aut consequuntur veniam nemo.",
    //   },
    //   {
    //     id: "d26e1452-ffaf-11e8-8eb2-f2801f1b9fd1",
    //     name: "Zebras",
    //     modified: "2018-08-13T23:00:00.000Z",
    //     folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
    //     content:
    //       "Veritatis porro minima perspiciatis. Repellat veniam quo iste ut. Iusto voluptas quae quibusdam. Odit neque iusto cupiditate iste quam. Fuga itaque aut praesentium ullam saepe ut et vero.\n \rQuisquam doloremque molestiae. Enim rerum dolorem et velit itaque magnam laborum. Aut officiis porro.\n \rQuae eum eaque error. Sed itaque ipsam nam provident aut voluptate. Perferendis repudiandae sequi laudantium est est animi eum. Unde alias et doloribus est hic et. Sed distinctio incidunt maiores aut voluptatibus et omnis mollitia fugit.",
    //   },
    // ];

    // //this.context.folders = [
    // const folders = [
    //   { id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1", name: "Super" },
    // ];
    //this.setState({ context: this.context });
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
    const value = { notes: this.state.notes, folders: this.state.folders };
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
