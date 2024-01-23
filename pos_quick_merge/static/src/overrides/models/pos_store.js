/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";
import {PosCollection} from "@point_of_sale/app/store/models"



patch(PosStore.prototype, {
    /**
     * @override
     */
    async setup() {
        this.selectedOrdersToMergeSet = new PosCollection();
        this.newMergedOrder=null;
        await super.setup(...arguments);
    },
})