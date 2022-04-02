import React from 'react';

class InvoiceItem extends React.Component {
    /*
        A component for a single item contained within an invoice.

        Props:
        item (str - The item number/code),
        description (str - The item's description),
        qty (int - The quantity of the item),
        price (int - The price of the item)
    */

    render() {
        const {item, description, qty, price} = this.props;
        return(<>
            <div className="flex w-full h-8 bg-white font-sans border border-x-1 border-b-1 border-t-0 border-gray-600 border-solid leading-4">
                <div className="flex w-[10%] justify-center items-center font-medium">{item}</div>
                <div className="flex w-[60%] ml-4 items-center">{description}</div>
                <div className="flex w-[15%] justify-center items-center">{qty}</div>
                <div className="flex w-[15%] justify-center items-center">{price}</div>
            </div>
        </>);
    }
}
export default InvoiceItem;