import React from "react";
import { render } from "react-dom";

const Card = props => {
  return (
    <div style={{ margin: "1em" }}>
      <img width="75" alt="zd" src={props.avatar_url} />
      <div style={{ display: "inline-block", marginLeft: 10 }}>
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

let data = [];

const CardList = props => {
  return <div>{props.cards.map(card => <Card key={card.id} {...card} />)}</div>;
};

class Form extends React.Component {
  state = { nameInput: "" };
  handleSubmit = event => {
    event.preventDefault();
    console.log("Event form submit", this.state.nameInput);
    axios
      .get(`https://api.github.com/users/${this.state.nameInput}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({ nameInput: "" });
        //console.log(resp);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name_git"
          type="text"
          value={this.state.nameInput}
          onChange={event => this.setState({ nameInput: event.target.value })}
          placeholder="Name"
          required
        />

        <button type="submit"> Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [
      /*
      {
        name: "roland",
        avatar_url: "https://avatars2.githubusercontent.com/u/28?v=4",
        company: "facebook1"
      },
      {
        name: "lucas",
        avatar_url: "https://avatars2.githubusercontent.com/u/29?v=4",
        company: "facebook2"
      },
      {
        name: "fanvsfan",
        avatar_url: "https://avatars2.githubusercontent.com/u/30?v=4",
        company: "facebook3"
      },
      {
        name: "railsjitsu",
        avatar_url: "https://avatars2.githubusercontent.com/u/32?v=4",
        company: "facebook4"
      }
          */
    ]
  };

  addNewCard = cardinfo => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardinfo)
    }));
    //console.log(cardinfo);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
