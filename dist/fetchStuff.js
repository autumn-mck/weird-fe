import { fetchJsonAsync } from "./utils.js";
import * as consts from "./consts.js";
export async function fetchStatusById(id) {
    return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id);
}
export async function fetchContextByPostId(id) {
    return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id + "/context");
}
export async function fetchUserStatuses(id) {
    return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + id + "/statuses");
}
export async function fetchFederatedTimeline() {
    return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
}
export async function fetchStatusAndContext(statusId) {
    return Promise.all([fetchStatusById(statusId), fetchContextByPostId(statusId)]);
}
//# sourceMappingURL=fetchStuff.js.map