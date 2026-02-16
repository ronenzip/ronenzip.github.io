import { Protocol, SelectorOptions, TriggerAutofillOptions } from './types';

/**
 * Interface for browser/page context (simplified for demonstration)
 */
interface BrowserContext {
    browser: any;
}

/**
 * AutofillHelper class containing the triggerAutofill method
 */
export class AutofillHelper implements BrowserContext {
    browser: any;

    constructor(browser: any) {
        this.browser = browser;
    }

    /**
     * Get object ID for a given selector
     */
    async getObjectIdForSelector(selector: string, selectorOptions?: SelectorOptions): Promise<any> {
        // Implementation placeholder
        return {};
    }

    /**
     * Describe a node given its object ID
     */
    async describeNode(objectId: any): Promise<any> {
        // Implementation placeholder
        return { backendNodeId: 1 };
    }

    /**
     * Get CDP client
     */
    async getClient(): Promise<any> {
        // Implementation placeholder
        return {
            send: async (method: string, params: any) => {
                // Implementation placeholder
            }
        };
    }

    /**
     * Trigger autofill on a form field with the provided address or card data.
     * 
     * @param selector - The CSS selector for the form field
     * @param options - Autofill options containing either address or card data
     * @param selectorOptions - Optional selector options including frame selector
     * @throws Error if both or neither address and card are provided
     * @throws Error if the field's backendNodeId cannot be resolved
     * @throws Error if the frame ID cannot be resolved
     */
    async triggerAutofill(selector: string, options: TriggerAutofillOptions, selectorOptions?: SelectorOptions): Promise<void> {
        const hasAddress = options.address !== undefined && options.address !== null;
        const hasCard = options.card !== undefined && options.card !== null;
        // Validate exactly one option is provided: XOR check (both true or both false is invalid)
        if (hasAddress === hasCard) {
            throw new Error("triggerAutofill requires exactly one of address or card in options");
        }

        const objectId = await this.getObjectIdForSelector(selector, selectorOptions);
        const node = await this.describeNode(objectId);
        const fieldId = node.backendNodeId;
        if (fieldId === undefined) {
            throw new Error("Could not resolve backendNodeId for the selected field");
        }

        const frame = await this.browser.getFrameToUse(selectorOptions?.frameSelector);
        const frameId = (frame as { _id?: string })._id;
        if (!frameId) {
            throw new Error("Could not resolve frameId for the current frame");
        }

        const params: Protocol.Autofill.TriggerRequest = { fieldId, frameId };
        if (options.address) {
            params.address = options.address as Protocol.Autofill.Address;
        } else if (options.card) {
            params.card = options.card as Protocol.Autofill.CreditCard;
        }

        const client = await this.getClient();
        await client.send("Autofill.trigger", params);
    }
}

export { Protocol, SelectorOptions, TriggerAutofillOptions } from './types';
