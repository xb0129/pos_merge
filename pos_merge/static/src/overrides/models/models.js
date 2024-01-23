/** @odoo-module */

import { Order, Orderline, Payment } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

// New orders are now associated with the current table, if any.


patch(Orderline.prototype, {
    setup() {
        super.setup(...arguments);
    },
    //@override
    clone() {
        const orderline = super.clone(...arguments);
        orderline.attribute_value_ids = this.attribute_value_ids;
        return orderline;
    },

});

