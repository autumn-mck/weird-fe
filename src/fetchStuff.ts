import { fetchJsonAsync } from "./utils";
import * as consts from "./consts";
import Status from "./models/status";
import { Context } from "./models/context";

export async function fetchStatusById(id: string): Promise<Status> {
	return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id);
}

export async function fetchContextByPostId(id: string): Promise<Context> {
	return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/statuses/" + id + "/context");
}

export async function fetchUserStatuses(id: string): Promise<Status[]> {
	return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/accounts/" + id + "/statuses");
}

export async function fetchFederatedTimeline(): Promise<Status[]> {
	return fetchJsonAsync(consts.userSelectedInstanceUrl + "/api/v1/timelines/public");
}

export async function fetchStatusAndContext(statusId: string) {
	return Promise.all([fetchStatusById(statusId), fetchContextByPostId(statusId)]);
}
