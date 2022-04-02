import React from 'react';
import clsx from 'clsx';
import AnimateHeight from 'react-animate-height';

import InvoiceItem from './InvoiceItem.js';

class Invoice extends React.Component {
    /* 
        An invoice component. Exports a single invoice.

        Props: 
        invNo (str - invoice number), 
        issueDate (str - 'MM/DD' The date the invoice was issued),
        dueDate (str - 'MM/DD' The date the payment is due), 
        name (str - The company name),
        status (str - 'Outstanding'/'Paid'/'Late' The status of the invoice),
        billingInfo (List - [billingName (str), billingAddress (str), billingCityState (str), billingEmail (str)]),
        shippingInfo (List - [shippingName (str), shippingAddress (str), shippingCityState (str), shippingEmail (str)]),
        items (List[List] - [[itemNo (str), itemDesc (str), qty(int), price (int)], ...]),
        notes (List - [note_0 (str), ... , note_k (str)]),
        startExpanded (bool - whether to start in the expanded view)
    */

    constructor(props) {
        super(props);
        let total = 0;
        props.items.forEach(item => total += item[2] * item[3]);
        if (props.startExpanded) {
            this.state = {
                expanded: true,
                height: 'auto',
                borders: true,
                total: total,
            };
        } else {
            this.state = {
                expanded: false,
                height: 0,
                borders: false,
                total: total,
            };
        }
    }

    toggleExpanded = () => {
        // Handles the state changes for toggling the expanded details
        
        const height = this.state.height;
        this.setState({expanded: !this.state.expanded, height: height === 0 ? 'auto' : 0});
    }

    renderButtonText = () => {
        // Sets the 'expand' button's text to either '+' or '-' depending on the expanded state

        if(this.state.expanded) {
            return(<>-</>);
        }
        return(<>+</>);
    }

    renderItems = () => {
        // Renders the list of invoice items

        const items = this.props.items;
        const invoiceItems = [];
        for (let i = 0; i < items.length; i++) {
            const qty = items[i][2].toString(); const price = "$" + items[i][3].toString();
            invoiceItems.push(<InvoiceItem item={items[i][0]} description={items[i][1]} qty={qty} price={price} key={i}/>);
        }
        return(<>{invoiceItems}</>);
    }

    renderNotes = () => {
        // Renders the list of notes

        const notes = this.props.notes;
        const notesList = [];
        for(let i = 0; i < notes.length; i++) {
            notesList.push(<li key={i}>{notes[i]}</li>)
        }
        if (notes.length !== 0) {
            return(<ul className="mt-0 mb-2 mr-2 pl-7 font-sans text-gray-800">{notesList}</ul>);
        }
        return(<></>);
    }

    renderDetails = () => {
        // Renders the expanded details of the invoice including billing information, recipient info, a list of items,
        // a list of notes, and options such as adding new notes and changing the status of the invoice.

        const {expanded, height, borders} = this.state;
        const billingInfo = this.props.billingInfo;
        const billName = billingInfo[0]; const billAddress = billingInfo[1]; const billCityState = billingInfo[2]; const billEmail = billingInfo[3];
        const shippingInfo = this.props.shippingInfo;
        const shipName = shippingInfo[0]; const shipAddress = shippingInfo[1]; const shipCityState = shippingInfo[2]; const shipEmail = shippingInfo[3];

        return(
        <AnimateHeight duration={500} height={ height } easing="ease-in-out" onAnimationStart={() => {this.setState({borders: true})}} 
        onAnimationEnd={() => {if(!expanded) {this.setState({borders: false})}}} // Animation callbacks to ensure no border is rendered while collapsed
        className={"w-full bg-gray-100 overflow-hidden border-x border-t-0 border-b border-gray-600 " + clsx({'border-solid': borders, 'border-none': !borders})}>
            {/* Bill to Fields */}
            <div className="w-1/3 ml-[2%] flex flex-wrap float-left">
                <div className="w-full h-6 mt-4 mb-2 bg-gray-600 font-sans font-semibold text-lg text-white leading-normal">
                    <span className="ml-4">Bill to:</span>
                </div>
                <div className="ml-2 mb-8 font-sans">
                    {billName}<br/>
                    {billAddress}<br/>
                    {billCityState}<br/>
                    {billEmail}
                </div>

            </div>
            {/* Ship to Fields */}
            <div className="w-1/3 mr-[2%] flex flex-wrap float-right">
                <div className="w-full h-6 mt-4 mb-2 bg-gray-600 font-sans font-semibold text-lg text-white leading-6">
                    <span className="ml-4">Ship to:</span>
                </div>
                <div className="ml-2 font-sans">
                    {shipName}<br/>
                    {shipAddress}<br/>
                    {shipCityState}<br/>
                    {shipEmail}
                </div>
            </div>
            {/* Items Table */}
            <div className="flex w-[96%] mx-[2%] flex-wrap mb-2">
                <div className="flex w-full h-6 bg-gray-600 font-sans text-white font-medium">
                    <div className="flex w-[10%] justify-center">Item</div>
                    <div className="flex w-[60%] ml-4">Description</div>
                    <div className="flex w-[15%] justify-center">Qty</div>
                    <div className="flex w-[15%] justify-center">Price</div>
                </div>
                {this.renderItems()}
            </div>
            {/* Notes and total */}
            <div className="flex w-[96%] mx-[2%] flex-wrap mb-2">
                <div className="flex w-full font-sans font-medium">
                    <div className="flex w-[70%]">Notes:</div>
                    <div className="flex w-[15%] justify-center">Total:</div>
                    <div className="flex w-[15%] justify-center">{"$" + this.state.total}</div>
                </div>
            </div>
            <div className="flex w-[70%] ml-[2%] flex-wrap mb-2">
                {this.renderNotes()}
            </div>
        </AnimateHeight>);
    }

    render() {
        const {invNo, issueDate, dueDate, name, status} = this.props;

        return(<div className="mb-1">
            <div className="w-full h-10 bg-gray-200 overflow-hidden border border-gray-600 border-solid font-sans font-medium leading-8">
                {/* Left columns */}
                <div className="flex float-left h-full">
                    <div className="flex items-center justify-center w-9 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">{invNo}</div>
                    <div className="flex items-center justify-center w-14 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">{issueDate}</div>
                    <div className="flex items-center justify-center w-14 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">{dueDate}</div>
                    <div className="flex items-center justify-center px-2 h-full">{name}</div>
                </div>
                {/* Right columns */}
                <div className="flex float-right h-full">
                    <div className="flex items-center justify-center px-2 h-full">{"$" + this.state.total}</div>
                    <div className={"flex items-center justify-center w-[102px] h-full border-l border-y-0 border-r-0 border-gray-400 border-dashed " + 
                    clsx({'text-green-700 font-bold tracking-wide': status === "Paid", 'text-red-700 font-bold tracking-wide': status === "Late"})}>{status}</div>
                    <div className="flex items-center justify-center w-8 h-full">
                        <button className="w-6 h-6 bg-gray-300" onClick={() => {this.toggleExpanded()}}>
                            {this.renderButtonText()}
                        </button>
                    </div>
                </div>
            </div>
            {/* The remaining body of the invoice only render when the expanded state is set to true */}
            {this.renderDetails()} 
        </div>);
    }
}
export default Invoice;