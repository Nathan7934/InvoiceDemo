import React from 'react';
import Invoice from './components/Invoice.js'
import NewInvoice from './components/NewInvoice.js'

class App extends React.Component {

    // We populate a list of invoices with demo data...
    state = {
        filter: "All", // A filter string for determining which invoices to render
        invoices: [
            {
                invNo: "297",
                issueDate: "03/24",
                dueDate: "04/05",
                name: "Silk Sonic",
                status: "Outstanding",
                billingInfo: ["Anderson Paak", "10802 Suede St.", "Los Angeles, CA 90024", "paakdatruegoat@gmail.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["F7932", "Silk Sonic proprietary software", 1, 900], 
                    ["DQ320", "Took his mama to the Marriot", 1, 250], 
                    ["T6283", "Cleanup fee - Smoking out the window", 1, 100]
                ],
                notes: [
                    "He sounded like he would be willing to jam in the future. Definitely keep an eye out.",
                    "The customer requested complete secrecy"
                ],
                startExpanded: true
            },
            {
                invNo: "130",
                issueDate: "02/12",
                dueDate: "05/12",
                name: "Bethesda Softworks",
                status: "Outstanding",
                billingInfo: ["Todd Howard", "1370 Piccard Drive, Suite 120", "Rockville, MD 20850", "contactrelations@bethesda.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["AC330", "Server maintenance request", 1, 825], 
                    ["YZ117", "Internal network inspection", 2, 475]
                ],
                notes: ["We've negotiated a longer payment period with the client"],
                startExpanded: false
            },
            {
                invNo: "023",
                issueDate: "03/25",
                dueDate: "04/02",
                name: "Good Music",
                status: "Paid",
                billingInfo: ["Kanye West", "777 Sunday St.", "Cody, WY 82414", "yeezyszn@gmail.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["SRQ25", "Sunday Service scheduling site", 1, 2250], 
                    ["YZ117", "Server upkeep fee", 3, 350]
                ],
                notes: ["Customer wishes to establish recurring payments at next meeting."],
                startExpanded: false
            },
            {
                invNo: "135",
                issueDate: "03/07",
                dueDate: "03/30",
                name: "Ubisoft Montreal",
                status: "Late",
                billingInfo: ["Ubisoft Internal", "3070 Someplace Drive, Unit 102", "Towny, QC A27 W4C", "corpocorp@ubisoft.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["AC330", "Server maintenance request", 1, 825], 
                    ["YZ117", "Internal network inspection", 1, 475],
                    ["NR003", "Hardware Installation", 10, 125],
                    ["YC211", "Labor", 3, 350]
                ],
                notes: [
                    "Client specifically commended John Smith's performance.",
                    "This is just another note.", 
                    "Insert some more specific details about our interaction with Ubisoft."
                ],
                startExpanded: false
            },
            {
                invNo: "431",
                issueDate: "03/28",
                dueDate: "04/15",
                name: "Lamenting Legalese LLC",
                status: "Outstanding",
                billingInfo: ["Chadwick McFergson", "9400 Moross Rd.", "Grosse Pointe, MI 48230", "fergmeister@gmail.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["F7932", "Service quote", 1, 85], 
                    ["DQ320", "Installed an automail arm and leg", 2, 315], 
                    ["T6283", "Replacement drive", 2, 50]
                ],
                notes: [
                    "Client is considering upgrading to our executive package.",
                    "The client requested complete secrecy."
                ],
                startExpanded: false
            },
            {
                invNo: "013",
                issueDate: "03/07",
                dueDate: "03/30",
                name: "Rockbell Company",
                status: "Paid",
                billingInfo: ["Winry Rockbell", "943 Otherplace Ave", "Seattle, WA 12345", "rockbellco@coldmail.com"],
                shippingInfo: ["Our Company", "1024 Somewhere St. West", "Toronto, ON A1B C2D", "support@company.net"],
                items: [
                    ["AC330", "Server maintenance request", 1, 500], 
                    ["YZ117", "Internal network inspection", 1, 315],
                    ["NR003", "Hardware Installation", 10, 25],
                    ["YC211", "Labor", 3, 350]
                ],
                notes: [
                    "Client specifically commended Smith Johnson for professionalism.", 
                    "This is just another note.", 
                    "Insert some more specific details about our interaction with Rockbell Co."
                ],
                startExpanded: false
            }
        ]
    }

    cylceFilter = () => {
        // Cycles the filter state when the "Status" button is clicked

        const filter = this.state.filter;
        let newFilter = "";
        switch(filter) {
            case "All":
                newFilter = "Outstanding"; break;
            case "Outstanding":
                newFilter = "Paid"; break;
            case "Paid":
                newFilter = "Late"; break;
            case "Late":
                newFilter = "All"; break;
        }
        this.setState({filter: newFilter});
    }

    addInvoice = (invoice) => {
        // A callback method to be passed down to the NewInvoice component
        // Updates the parent (this) component's invoices list

        this.setState({invoices: [...this.state.invoices, invoice]});
    }

    renderInvoices = () => {
        // Iterates through the list of invoices contained in the state and returns a list of Invoice components

        const invoices = this.state.invoices;
        const filter = this.state.filter;
        const invoiceList = [];
        for (let i = 0; i < invoices.length; i++) {
            const {invNo, issueDate, dueDate, name, status, billingInfo, shippingInfo, items, notes, startExpanded} = invoices[i];
            if ((status === filter) || (filter === "All")) {
                invoiceList.push(
                    <Invoice invNo={invNo} issueDate={issueDate} dueDate={dueDate} name={name} status={status}
                    billingInfo={billingInfo} shippingInfo={shippingInfo} items={items} notes={notes} startExpanded={startExpanded} key={i}/>);
            }
        }
        return(<>{invoiceList}</>);
    }

    render() {
        return(<>
        <div className="flex w-screen justify-center flex-wrap">
            <div className="w-5/6 lg:w-2/3 xl:w-1/2 min-w-[580px]">
                {/* Header */}
                <h1 className="flex w-full font-sans mt-10 mb-6 text-gray-800">Vertmix Invoice Demo</h1>
                {/* Phony Navigation Bar */}
                <div className="flex w-full h-8 mb-4 bg-gray-600 font-sans font-semibold text-white leading-4 border border-gray-600 border-solid">
                    <div className="flex mx-2 items-center">Home</div>
                    <div className="flex mx-2 items-center">Contacts</div>
                    <div className="flex px-2 items-center bg-gray-200 text-gray-800">Invoices</div>
                    <div className="flex mx-2 items-center">Estimates</div>
                    <div className="flex mx-2 items-center">Reports</div>
                </div>
                {/* Action buttons, e.g. expand all, sort by status, create new invoice.. */}
                <div className="w-full mt-2">
                    <div className="flex flex-wrap">
                        <button className="h-7 mr-2 bg-gray-500 font-sans text-white font-medium leading-4"
                        onClick={() => {this.cylceFilter()}}>Status: {this.state.filter}</button>
                        <NewInvoice addInvoice={this.addInvoice}/>
                    </div>
                </div>
                {/* Table headers for invoice columns */}
                <div className="w-full mt-2 font-sans text-gray-800 font-medium border-x border-y-0 border-transparent border-solid">
                    {/* Left columns */}
                    <div className="flex float-left h-full">
                        <div className="flex items-center justify-center w-9 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">No.</div>
                        <div className="flex items-center justify-center w-14 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">Issued</div>
                        <div className="flex items-center justify-center w-14 h-full border-r border-y-0 border-l-0 border-gray-400 border-dashed">Due</div>
                        <div className="flex items-center justify-center px-2 h-full">Name</div>
                    </div>
                    {/* Right columns */}
                    <div className="flex float-right h-full">
                        <div className="flex items-center justify-center px-2 h-full">Sum</div>
                        <div className="flex items-center justify-center w-[102px] h-full border-l border-y-0 border-r-0 border-gray-400 border-dashed ">Status</div>
                        <div className="flex w-8 h-full"/>
                    </div>
                </div>
                {/* Render the list of invoices */}
                {this.renderInvoices()}
            </div>
        </div>
        </>);
    }
}

export default App;