import React from 'react';
import clsx from 'clsx';
import AnimateHeight from 'react-animate-height';
import InvoiceItem from './InvoiceItem.js';

class NewInvoice extends React.Component {
    /*
        The component containing the fields for creating a new invoice.
        Defaults to a collapsed view, expanded via the 'New Invoice' button.

        Props:
        addInvoice (func - A callback function to add an invoice to the parent's state)
    */

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            height: 0,
            borders: false,
            invNo: "",
            issueDate: "",
            dueDate: "",
            name: "",
            total: 0,
            status: "",
            billingInfo: ["", "", "", ""],
            shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
            items: [],
            notes: [],
            currItemNo: "",
            currItemDesc: "",
            currItemQty: "",
            currItemPrice: "",
            currNote: ""
        }
    }

    createInvoice = () => {
        // Creates a new invoice object to be sent to the parent component App.js

        const {invNo, issueDate, dueDate, name, status, billingInfo, shippingInfo, items, notes} = this.state;
        const newInvoice = {
            invNo: invNo,
            issueDate: issueDate,
            dueDate: dueDate,
            name: name,
            status: status,
            billingInfo: billingInfo,
            shippingInfo: shippingInfo,
            items: items,
            notes: notes,
            startExpanded: false
        };
        // Clear out all the input fields
        this.setState({
            invNo: "", issueDate: "", dueDate: "", name: "", total: 0, status: "", billingInfo: ["", "", "", ""],
            shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
            items: [], notes: [], currItemNo: "", currItemQty: "", currItemPrice: "", currNote: ""
        });
        this.props.addInvoice(newInvoice);
    }

    toggleExpanded = () => {
        // Handles the state changes for toggling the expanded details

        const height = this.state.height;
        this.setState({expanded: !this.state.expanded, height: height === 0 ? 'auto' : 0});
    }

    processMainInput = (event) => {
        // Process changes and update state for 'No.', 'Issued', 'Due', 'Company Name',
        // 'Status', and 'Write a note...' fields

        const value = event.target.value;
        const id = event.target.id;
        switch(id) {
            case "invNo":
                this.setState({invNo: value}); break;
            case "issueDate":
                this.setState({issueDate: value}); break;
            case "dueDate":
                this.setState({dueDate: value}); break;
            case "name":
                this.setState({name: value}); break;
            case "status":
                this.setState({status: value}); break;
            case "note":
                this.setState({currNote: value}); break;
        }
    }

    processItemInput = (event) => {
        // Process changes and update state for 'Item No.', 'Description', 'Qty',
        // and 'Price' fields

        const value = event.target.value;
        const id = event.target.id;
        switch(id) {
            case "item":
                this.setState({currItemNo: value}); break;
            case "description":
                this.setState({currItemDesc: value}); break;
            case "qty":
                this.setState({currItemQty: value}); break;
            case "price":
                this.setState({currItemPrice: value}); break;
        }
    }

    processContactInput = (event) => {
        // Process changes and update state for all contact info related fields

        const value = event.target.value;
        const id = event.target.id;
        const billInfo = this.state.billingInfo;
        const shipInfo = this.state.shippingInfo;
        let newInfo;
        switch(id) {
            case "billName":
                newInfo = [value, billInfo[1], billInfo[2], billInfo[3]];
                this.setState({billingInfo: newInfo});
                break;
            case "billAddress":
                newInfo = [billInfo[0], value, billInfo[2], billInfo[3]];
                this.setState({billingInfo: newInfo});
                break;
            case "billCityState":
                newInfo = [billInfo[0], billInfo[1], value, billInfo[3]];
                this.setState({billingInfo: newInfo});
                break;
            case "billEmail":
                newInfo = [billInfo[0], billInfo[1], billInfo[2], value];
                this.setState({billingInfo: newInfo});
                break;
            case "shipName":
                newInfo = [value, shipInfo[1], shipInfo[2], shipInfo[3]];
                this.setState({shippingInfo: newInfo});
                break;
            case "shipAddress":
                newInfo = [shipInfo[0], value, shipInfo[2], shipInfo[3]];
                this.setState({shippingInfo: newInfo});
                break;
            case "shipCityState":
                newInfo = [shipInfo[0], shipInfo[1], value, shipInfo[3]];
                this.setState({shippingInfo: newInfo});
                break;
            case "shipEmail":
                newInfo = [shipInfo[0], shipInfo[1], shipInfo[2], value];
                this.setState({shippingInfo: newInfo});
                break;
        }
    }

    addNote = () => {
        // Adds a note to the list

        const newNote = this.state.currNote;
        if (newNote === "") { return; }
        this.setState({
            notes: [...this.state.notes, newNote],
            currNote: ""
        });
    }

    renderNotes = () => {
        // Renders the list of notes

        const notes = this.state.notes;
        const notesList = [];
        for(let i = 0; i < notes.length; i++) {
            notesList.push(<li key={i}>{notes[i]}</li>)
        }
        if (notes.length !== 0) {
            return(<ul className="mt-0 mb-1 mr-2 pl-7 font-sans text-gray-800">{notesList}</ul>);
        }
        return(<></>);
    }

    addItem = () => {
        // Adds an item to the list, input retrieved from fields
        // Parses item info from state and updates the total

        const {currItemNo, currItemDesc, currItemQty, currItemPrice} = this.state;
        if (currItemNo === "" || currItemQty === "" || currItemPrice === "") { return; }
        const qty = parseInt(currItemQty.replace(/\D/g,''));
        const price = parseInt(currItemPrice.replace(/\D/g,''));
        const newItem = [currItemNo, currItemDesc, qty, price];
        let newTotal = this.state.total;
        newTotal += price * qty;
        this.setState({
            total: newTotal,
            items: [...this.state.items, newItem],
            currItemNo: "",
            currItemDesc: "",
            currItemQty: "",
            currItemPrice: ""
        });
    }

    renderItems = () => {
        // Renders the list of invoice items

        const items = this.state.items;
        const invoiceItems = [];
        for (let i = 0; i < items.length; i++) {
            const qty = items[i][2].toString(); const price = "$" + items[i][3].toString();
            invoiceItems.push(<InvoiceItem item={items[i][0]} description={items[i][1]} qty={qty} price={price} key={i}/>);
        }
        return(<>{invoiceItems}</>);
    }

    render() {
        const {expanded, height, borders} = this.state;

        // Determine conditional JSX
        let itemJSX = <></>; let totalJSX = <></>;
        if (this.state.items.length !== 0) {
            itemJSX = (
                <div className="flex w-[96%] mx-[2%] flex-wrap mb-2">
                    <div className="flex w-full h-6 bg-gray-600 font-sans text-white font-medium">
                        <div className="flex w-[10%] justify-center">Item</div>
                        <div className="flex w-[60%] ml-4">Description</div>
                        <div className="flex w-[15%] justify-center">Qty</div>
                        <div className="flex w-[15%] justify-center">Price</div>
                    </div>
                {this.renderItems()}
                </div>
            );
            totalJSX = (<>
                <div className="flex w-[15%] justify-center">Total:</div>
                <div className="flex w-[15%] justify-center">{"$" + this.state.total}</div>
            </>);
        }
        let notesJSX = <></>;
        if (this.state.notes.length !== 0) {
            notesJSX = (
                <div className="flex w-[70%] ml-[2%] flex-wrap mb-2">
                    <div className="w-full font-sans font-medium">Notes:</div>
                    {this.renderNotes()}
                </div>
            );
        }
        const newInvBtnStatus = expanded ? <>-</> : <>+</>;

        return(<>
            <button className="h-7 bg-gray-500 font-sans text-white font-medium leading-4" 
            onClick={() => {this.toggleExpanded()}}><span className="font-mono">{newInvBtnStatus}</span> New Invoice</button>
            
            <AnimateHeight duration={500} height={ height } easing="ease-in-out" onAnimationStart={() => {this.setState({borders: true})}} 
            onAnimationEnd={() => {if(!expanded) {this.setState({borders: false})}}} // Animation callbacks to ensure no border is rendered while collapsed
            className={"w-full mt-2 bg-gray-100 overflow-hidden border-2 border-gray-600 " + clsx({'border-solid': borders, 'border-none': !borders})}>
                {/* Header */}
                <div className="w-full ml-[2%] mt-2 mb-3 font-sans font-bold text-xl text-gray-800">Create Invoice</div>
                {/* Main info fields */}
                <div className="w-full">
                    <div className="flex float-left ml-[2%]">
                        <input id="invNo" value={this.state.invNo} onChange={this.processMainInput}
                        className="w-8 h-5 rounded-none border border-gray-600 border-solid" type="text" placeholder="No." maxLength={3}/>
                        <input id="issueDate" value={this.state.issueDate} onChange={this.processMainInput}
                        className="w-10 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Issued" maxLength={5}/>
                        <input id="dueDate" value={this.state.dueDate} onChange={this.processMainInput}
                        className="w-10 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Due" maxLength={5}/>
                        <input id="name" value={this.state.name} onChange={this.processMainInput}
                        className="w-64 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Company Name" maxLength={25}/>
                    </div>
                    <div className="flex justify-end mr-[2%]">
                        <input id="status" value={this.state.status} onChange={this.processMainInput}
                        className="w-[82px] h-5 rounded-none border border-gray-600 border-solid" type="text" placeholder="Status"/>
                    </div>
                </div>
                {/* Bill to Fields */}
                <div className="w-1/3 ml-[2%] flex flex-wrap float-left">
                    <div className="w-full h-6 mt-4 mb-2 bg-gray-600 font-sans font-semibold text-lg text-white leading-normal">
                        <span className="ml-4">Bill to:</span>
                    </div>
                    <div className="w-full mb-8 font-sans">
                        <input id="billName" value={this.state.billingInfo[0]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Name" maxLength={25}/><br/>
                        <input id="billAddress" value={this.state.billingInfo[1]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Address" maxLength={25}/><br/>
                        <input id="billCityState" value={this.state.billingInfo[2]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="City, State/Province, ZIP" maxLength={25}/><br/>
                        <input id="billEmail" value={this.state.billingInfo[3]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Email" maxLength={25}/>
                    </div>
                </div>
                {/* Ship to Fields */}
                <div className="w-1/3 mr-[2%] flex flex-wrap float-right">
                    <div className="w-full h-6 mt-4 mb-2 bg-gray-600 font-sans font-semibold text-lg text-white leading-6">
                        <span className="ml-4">Ship to:</span>
                    </div>
                    <div className="w-full mb-8 font-sans">
                        <input id="shipName" value={this.state.shippingInfo[0]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Name" maxLength={25}/><br/>
                        <input id="shipAddress" value={this.state.shippingInfo[1]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Address" maxLength={25}/><br/>
                        <input id="shipCityState" value={this.state.shippingInfo[2]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="City, State/Province, ZIP" maxLength={25}/><br/>
                        <input id="shipEmail" value={this.state.shippingInfo[3]} onChange={this.processContactInput}
                        className="w-full mb-1 h-6 rounded-none border border-gray-600 border-solid box-border pl-1" type="text" placeholder="Email" maxLength={25}/>
                    </div>
                </div>
                {/* Item Fields */}
                <div className="w-full">
                    <div className="flex float-left mx-[2%] mb-2 overflow-hidden">
                        <input id="item" value={this.state.currItemNo} onChange={this.processItemInput}
                        className="w-16 h-5 rounded-none border border-gray-600 border-solid" type="text" placeholder="Item No." maxLength={5}/>
                        <input id="description" value={this.state.currItemDesc} onChange={this.processItemInput}
                        className="w-72 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Description"/>
                        <input id="qty" value={this.state.currItemQty} onChange={this.processItemInput}
                        className="w-6 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Qty" maxLength={3}/>
                        <input id="price" value={this.state.currItemPrice} onChange={this.processItemInput}
                        className="w-12 h-5 ml-1 rounded-none border border-gray-600 border-solid" type="text" placeholder="Price" maxLength={6}/>
                        <button className="ml-1 bg-gray-300" onClick={() => {this.addItem()}}>Add</button>
                    </div>
                </div>
                {/* Items Table */}
                {itemJSX}
                {/* Notes and total */}
                <div className="flex w-[96%] mx-[2%] flex-wrap mb-2">
                    <div className="flex w-full font-sans font-medium">
                        <div className="flex w-[70%]">
                            <input id="note" value={this.state.currNote} onChange={this.processMainInput}
                            className="w-72 h-5 rounded-none border border-gray-600 border-solid" type="text" placeholder="Write a note..."/>
                            <button className="ml-1 bg-gray-300" onClick={() => {this.addNote()}}>Add</button>
                        </div>
                        {totalJSX}
                    </div>
                </div>
                {/* The list of added notes */}
                {notesJSX}
                {/* The create note button */}
                <div className="flex w-[96%] mx-[2%] mb-2 justify-end">
                    <button className="bg-gray-500 h-7 text-white font-semibold" onClick={() => {this.createInvoice()}}>Create</button>
                </div>


            </AnimateHeight>
        </>);
    }
}
export default NewInvoice;