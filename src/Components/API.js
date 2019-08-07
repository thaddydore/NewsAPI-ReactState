import React from "react";
import { countries, countryCodes } from "./countries";
import Content from "./Content";
import apiStyles from "../styles/API.module.css";

//The API key from news_api is stored in the .env.development for private access
const Api_key = process.env.REACT_APP_API_KEY;

class APICall extends React.Component {
  //The various states in play
  state = {
    dataSet: [],
    value: "nigeria",
    country: "NG",
    loading: true,
    k: true
  };

  // handleGetNews = () => {};
  //This async lifecycle mounts with the default state when the application is started
  async componentDidMount() {
    //This an API fetch request with query and API key

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.state.country
      }&apiKey=${Api_key}`
    );
    const data = await response.json();
    console.log(data);
    //here I updated the state with data from the api
    this.setState({
      loading: false,
      dataSet: data
    });
  }

  //this async/await lifecycle triggers when a value is entered an searched
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.country !== this.state.country) {
      this.setState({ loading: true });
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${
          this.state.country
        }&apiKey=${Api_key}`
      );
      //an update to the state with the new api fetch data
      const data = await response.json();
      this.setState({
        loading: false,
        dataSet: data
      });
    }
  }

  //this function handles the new value entered to the 'search' input tag
  handleChange = e => {
    const data = e.target.value;
    console.log(data);
    this.setState({
      value: e.target.value
    });
    this.updateSearch(data);
  };

  /*this is a super algorithm. sexy hacking!!! Thanks to George for the initiative and help....badass hacker. 
  this function has access to country/country codes data from the country component. It looks for the current input value and finds a match in the countries component object. It then gets the corresponding initials of the matched country and returns it */

  matchQuery = data => {
    const objKey = Object.keys(countryCodes);
    console.log(data, "data");
    const objData = objKey.filter(
      item => item.toLowerCase() === data.toLowerCase()
    );

    let countryCode = "";

    for (let key in countryCodes) {
      if (objData[0] === key) {
        countryCode = countryCodes[key].split(" ")[0];
      }
    }

    return countryCode;
  };

  //this function fires when the 'search' button is clicked. it updates the country state with the returned value from the matchquery function. this updated state serves as a query for the searched country
  updateSearch = data => {
    // console.log(this.state.country, "hiiiiiiiiiiiii", this.state.value);
    console.log(this.state.value, "lllllll");
    if (!this.state.value) return;
    this.setState({
      country: this.matchQuery(data)
    });
  };

  render() {
    const AllCountries = countries.map(country => country);
    return (
      <div style={apiStyles.body}>
        {/* <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="country name"
        /> */}
        <select onChange={this.handleChange}>
          <option value="nigeria">select a country</option>
          {countries.map(country => (
            <option value={country}>{country}</option>
          ))}
        </select>
        <br />
        {/* <button onClick={this.updateSearch}>search</button> */}
        <div>
          {/* here i passed the loading and dataset/api data to the content component for rendering */}
          <Content loading={this.state.loading} content={this.state.dataSet} />
        </div>
      </div>
    );
  }
}

export default APICall;
