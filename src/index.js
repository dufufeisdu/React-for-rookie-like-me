import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class FileterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleCheckboxSubmit = this.handleCheckboxSubmit.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  handleCheckboxSubmit(value) {
    this.setState({
      filterText: value
    });
  }
  handleCheckboxClick() {
    this.setState({
      inStockOnly: !this.state.inStockOnly
    })
  }
  render() {
    return (
      <div>
        <SearchBar handleCheckboxSubmit={ this.handleCheckboxSubmit } handleCheckboxClick={ this.handleCheckboxClick } />
        <ProductTable products={ this.props.products } filterText={ this.state.filterText } inStockOnly={ this.state.inStockOnly } />
      </div>
    );
  }
}
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  handleSubmit(e) {
    this.props.handleCheckboxSubmit(e.target.value);
  }
  handleCheckbox(e) {
    this.props.handleCheckboxClick();
  }
  render() {
    return (
      <form>
        <input type='text' value={ this.props.value } placeholder='Search...' onChange={ this.handleSubmit } />
        <p>
          <input type='checkbox' onChange={ this.handleCheckbox } />{ ' ' }Only show products in stock
        </p>
      </form>
    );
  }
}
class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var rows = [];
    var lastCategory = null;
    var filterText = this.props.filterText;
    var inStockOnly = this.props.inStockOnly;
    this.props.products.forEach(function (product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={ product.category } key={ product.category } />);
      }
      if (product.name.indexOf(filterText) !== -1) {
        if (inStockOnly) {
          if (product.stocked) {
            rows.push(<ProductRow product={ product } key={ product.name } />);
          }
        } else {
          rows.push(<ProductRow product={ product } key={ product.name } />);
        }
      }
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ rows }</tbody>

      </table>

    );
  }
}
class ProductCategoryRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr >
        <th colSpan='2'>{ this.props.category }</th>
      </tr>
    );
  }
}
class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var name = this.props.product.stocked ? this.props.product.name : <span style={ { color: 'red' } }>{ this.props.product.name }</span>
    return (
      <tr>
        <td>{ name }</td>
        <td>{ this.props.product.price }</td>
      </tr>
    )
  }
}
// ========================================
var data = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

ReactDOM.render(
  <FileterableProductTable products={ data } />,
  document.getElementById('root')
);
