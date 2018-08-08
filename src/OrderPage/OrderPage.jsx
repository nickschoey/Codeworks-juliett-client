import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderActions } from '../_actions/order.actions';
import moment from 'moment'
import './OrderPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Accordion, AccordionItem } from 'react-sanfona';
class OrderPage extends React.Component {
  handleDeleteOrder (id) {

    return (e) => this.props.delete(id);
  }

  handleConfirmOrder (id) {
    return (e) => this.props.confirm(id);
  }

  componentDidMount () {

    // this.props.getAll()
    this.props.getTransactions()
  }

  listMatched (orders, confirmed) {


    if (this.props.loading === false) {


      return orders.map((order, i) =>
        <AccordionItem title={`${moment(order.createdDate).format('HH:MM DD/MM')} ${order.name} ${order.items.length} item/s`} key={i}>
          <div className="userData">
            COSTUMER INFO<br />
            id: {order.id}<br />
            name: {order.name}<br />
            email: {order.email}<br />
            phone: {order.phone}<br />
            address: {order.address}<br />
          </div>
          <div className="orderData">
            ORDER<br />
            <ul>
            {order.items.map(item =>
              <li>{item.name}</li>
            )}
            </ul>
          </div>
          <div className="paymentData">
            PAYMENT INFO<br/>
            Tx Id: {confirmed ? order.transaction : 'PENDING'}<br />
            Price in ETH: {order.cryptoPrice}<br />
            Price in EUR: {order.fiatPrice}<br />
          </div>
          <div onClick={confirmed ? this.handleConfirmOrder(order.id) : this.handleDeleteOrder(order.id)} className="action">
            <FontAwesomeIcon icon={confirmed ? faCheck : faTrash}/>
          </div>
        </AccordionItem>
      )

    }
  }

  render () {

    return (
      <div className="main__order">
        <div className="paid">
          <h1>PAID ORDERS</h1>
          <Accordion>
            {this.listMatched(this.props.matchedOrders, true)}
          </Accordion>
        </div>
        <div className="unpaid">
          <h1>UNPAID ORDERS</h1>
          <Accordion>
            {this.listMatched(this.props.unMatchedOrders, false)}
          </Accordion>
        </div>
        <Link to="/" className="btn btn-link">Back</Link>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  loading: state.orders.loading,
  unMatchedTxs: state.orders.unMatchedTxs,
  matchedOrders: state.orders.matchedOrders,
  unMatchedOrders: state.orders.unmatchedOrders

})

const mapDispatchToProps = (dispatch) => ({
  // getAll: () => dispatch(orderActions.getAll()),
  getTransactions: () => dispatch(orderActions.getTransactions()),
  delete: id => dispatch(orderActions.delete(id)),
  confirm: id => dispatch(orderActions.confirm(id))
})

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(OrderPage)
export { connectedOrderPage as OrderPage }; 