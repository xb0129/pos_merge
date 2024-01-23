
/** @odoo-module **/

import { RenderContainer } from "@point_of_sale/app/printer/render_service";
import { patch } from "@web/core/utils/patch";
import { Component, onRendered, reactive, useRef, xml } from "@odoo/owl";

patch(RenderContainer.prototype, {
    setup() {
        super.setup(...arguments);
        onRendered(async () => {
                // this timeout is needed in order to wait for the
            // component to arrive in it's final state

                await new Promise((r) => setTimeout(r, 500));
                this.props.onRendered(this.ref?.el?.firstChild);
            })
    }

})
