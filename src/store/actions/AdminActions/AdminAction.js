import { GET_DASHBOARD_DATA} from "../../constant";

export function getDashboardData(data) {
    return {
        type: GET_DASHBOARD_DATA,
        data
    };
}