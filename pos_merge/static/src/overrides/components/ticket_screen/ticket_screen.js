/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";
import { useAutofocus } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";
import { parseFloat } from "@web/views/fields/parsers";
import { ConfirmPopup } from "@point_of_sale/app/utils/confirm_popup/confirm_popup";
import { onWillDestroy } from "@odoo/owl";
import {PosCollection,Orderline} from "@point_of_sale/app/store/models"


patch(TicketScreen.prototype, {

    async setup() {
        await super.setup(...arguments,        
            onWillDestroy(() => {
            this.pos.selectedOrdersToMergeSet= new PosCollection();
            this.pos.newMergedOrder=null;
          }));
    },


    
    onSelectedOrder(ev, clickedOrder) {
        const isChecked = ev.target.checked;
        
       
        if (isChecked) {

            this.pos.selectedOrdersToMergeSet.add(clickedOrder);
        } else {


            this.pos.selectedOrdersToMergeSet.remove(clickedOrder);
        }
    
    },

    mergeOrder(){
        const newOrder = this.pos.add_new_order();
        newOrder.tableId=this.pos.selectedOrdersToMergeSet[0].tableId;
        this.pos.selectedOrdersToMergeSet.forEach(order=>{
            order.orderlines.forEach(line=>{
                const newLine=line.clone();
                newLine.skipChange= true;
                newOrder.add_orderline(newLine)
                }
                    );
                    this._deleteMergedOrder(order);
            }
        )
        this.pos.set_order(newOrder);
        this.closeTicketScreen();
    },

    _deleteMergedOrder(order){
        if (order) {

            if (order === this.pos.get_order()) {
                this._selectNextOrder(order);
            }
            this.pos.removeOrder(order);
        }
        if (this.pos.isOpenOrderShareable()) {
            this.pos._removeOrdersFromServer();
        }
    },

    getSelectedOrderToMerge(){
        return this.pos.newMergedOrder;
    },

    getSelectedOrdersToMergeSet(){
        return this.pos.selectedOrdersToMergeSet;
    }
});


patch(TicketScreen, {
    components: { ...TicketScreen.components },
});
