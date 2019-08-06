import React from "react";
import countryCodes from "./countries";

const Api_key = process.env.REACT_APP_API_KEY;

class APICall extends React.Component {
  state = {
    dataSet: "",
    value: "",
    country: "NG"
  };

  async componentDidMount() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.state.country
      }&apiKey=${Api_key}`
    );
    const data = await response.json();
    console.log(data);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.country !== this.state.country) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${
          this.state.country
        }&apiKey=${Api_key}`
      );
      const data = await response.json();
      console.log(data);
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  updateSearch = e => {
    e.preventDefault();
    const objKey = Object.keys(countryCodes);

    const objData = objKey.filter(
      item => item.toLowerCase() === this.state.value.toLowerCase()
    );

    let countryCode = "";

    for (let key in countryCodes) {
      if (objData[0] === key) {
        countryCode = countryCodes[key].split(" ")[0];
      }
    }

    this.setState({
      country: countryCode
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.updateSearch}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>search</button>
        </form>
      </div>
    );
  }
}

export default APICall;
