import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderActions } from '../_actions/order.actions';
import moment from 'moment'
class OrderPage extends React.Component {
  handleDeleteOrder (id) {

    return (e) => this.props.delete(id);
  }
  
  componentDidMount () {

    this.props.getAll()
    this.props.getTransactions()

  }

  listOrders () {
    if (this.props.orders.loading === false) {
      return this.props.orders.orders.map(el =>
        <li key={el.id}>
          {el.cryptoPrice} {el.name}. {el.items.length} item/s. {moment(el.createdDate).format('HH:MM')}. {el.paid ? 'Confirmed' : 'Pending'}. {el.wallet} 
          {
            <span> - <a onClick={this.handleDeleteOrder(el._id)}>Delete</a></span>
          }
        </li>)
    }
  }
  render () {
    return (

      <div>
        <ul>
        {this.listOrders()}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  orders: state.orders

})

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(orderActions.getAll()),
  delete: id => dispatch(orderActions.delete(id)),
  getTransactions: () => dispatch(orderActions.getTransactions())
  
})

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(OrderPage)
export { connectedOrderPage as OrderPage }; 