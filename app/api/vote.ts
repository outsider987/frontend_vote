import { request } from "../utils/request";

export function getVoteInfo() {
  return {
    CREATE_EVENT: (payload: any) => {
      return request({
        method: "POST", 
        url: "/create-event",
        data: payload
      });
    },
    GENERATE_TICKET: (payload: any) => {
      return request({
        method: "POST",
        url: "/generate-ticket",
        data: payload
      });
    },
    TOGGLE_VOTING: (payload: any) => {
      return request({
        method: "POST",
        url: "/toggle-voting",
        data: payload
      });
    },
    SUBMIT_VOTE: (payload: any) => {
      return request({
        method: "POST",
        url: "/vote",
        data: payload
      });
    },
    GET_VOTE_INFO: (payload: any) => {
      return request({
        method: "GET",
        url: "/vote-info",
        data: payload
      });
    },
  };
}
