import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderActions } from '../_actions/order.actions';
import moment from 'moment'
class OrderPage extends React.Component {
  componentDidMount () {

    this.props.getAll()

  }

  listOrders () {
    if (this.props.orders.loading === false) {
      return this.props.orders.orders.map(el =>
        <li key={el.id}>
          {el.cryptoPrice} {el.name}. {el.items.length} item/s. {moment(el.createdDate).format('HH:MM')}. {el.paid ? 'Confirmed' : 'Pending'}. {el.wallet}
        </li>)
    }
  }
  render () {
    return (
      <div>
        {this.listOrders()}
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  orders: state.orders

})

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(orderActions.getAll()),
})

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(OrderPage)
export { connectedOrderPage as OrderPage }; 