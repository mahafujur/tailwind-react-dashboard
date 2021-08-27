import {sendPostRequest} from "../libs/FetchApi";

export function updateProfile(data) {
  return sendPostRequest('/users/' + data.id)
}

