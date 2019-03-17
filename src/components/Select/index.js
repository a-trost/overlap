import React, { Component } from "react";

export default class Select extends Component {
  render() {
    return (
      <select id="pet-select">
        <option value="">Filter by Tag</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
    );
  }
}
