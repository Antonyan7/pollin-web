import {CypressIds} from "../../src/constants/cypressIds";

// extension function to form data-cy selector from [CypressIds]
export class CyUtils {
    public static getSelector(id: CypressIds) {
        return `[data-cy="${id}"]`;
    }
}