/**
 * Type definitions for the triggerAutofill implementation
 */

/**
 * Protocol namespace for CDP types
 */
export namespace Protocol {
    export namespace Autofill {
        export interface Address {
            // Address autofill fields
            [key: string]: string;
        }

        export interface CreditCard {
            // Credit card autofill fields
            [key: string]: string;
        }

        export interface TriggerRequest {
            fieldId: number;
            frameId: string;
            address?: Address;
            card?: CreditCard;
        }
    }
}

/**
 * Options for selector-based operations
 */
export interface SelectorOptions {
    frameSelector?: string;
    [key: string]: any;
}

/**
 * Options for triggering autofill
 */
export interface TriggerAutofillOptions {
    address?: Protocol.Autofill.Address | null;
    card?: Protocol.Autofill.CreditCard | null;
}
