import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    
    thresholds: {
        'http_req_duration': ['avg<2000'], 
        'http_req_failed': ['rate<0.01'],  
    },
    
    scenarios: {
        
        load_test: {
            executor: 'constant-vus',
            vus: 50,
            duration: '5m',
            startTime: '0s',
        },
        
        stress_test: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '2m', target: 200 }, 
                { duration: '8m', target: 200 }, 
            ],
            startTime: '5m', 
        },
        
        spike_test: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 500 }, 
                { duration: '2m', target: 500 },  
                { duration: '30s', target: 0 },   
            ],
            startTime: '15m', 
        },
        
        soak_test: {
            executor: 'constant-vus',
            vus: 30,
            duration: '30m',
            startTime: '18m', 
        },
    },
};

export default function () {
    
    const url = 'https://test.k6.io'; 
    const res = http.get(url);
    
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    
    sleep(1);
}

export function handleSummary(data) {
    return {
        "results/summary.html": htmlReport(data), 
        "results/allure-results.json": JSON.stringify(data), 
    };
}