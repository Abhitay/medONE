import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default function Chart({ labelchartvalues, chartvalues, chartvalues2, labelchartvalues2, }) {

    const [chartvalues3, setchartvalues3] = useState([])
    const [labelchartvalues3, setlabelchartvalues3] = useState([])

    useEffect(() => {
        Axios.post('http://localhost:3001/otherHistoryChart').then((response) => {
            setchartvalues3(response.data)
            setlabelchartvalues3(response.data.map((number) => {
                return number.SaleDate;
            }));

        });

    }, []);

    const [filledDate, setfilledDate] = useState([]);
    const [dataSet, setdataSet] = useState([]);
    const [MapdataSet, setMapdataSet] = useState([]);

    const [filledDate2, setfilledDate2] = useState([]);
    const [dataSet2, setdataSet2] = useState([]);
    const [MapdataSet2, setMapdataSet2] = useState([]);

    useEffect(() => {

        // console.log(labelchartvalues2);
        // console.log(chartvalues);

        // console.log(chartvalues.map((d) => d.SaleDate))

        setfilledDate(chartvalues.map((d) => d.SaleDate));
        setdataSet(labelchartvalues2.map(d => {
            const indexOfData = filledDate.indexOf(d);
            if (indexOfData !== -1) {

                return chartvalues[indexOfData];
            }
            else {
                return 0;
            }
        }));
        if (dataSet.length > 0) {
            setMapdataSet(dataSet.map((number) => {
                return number.NoIt
            }));
        }

        setfilledDate2(chartvalues3.map((d) => d.SaleDate));
        setdataSet2(labelchartvalues2.map(d => {
            const indexOfData = filledDate2.indexOf(d);
            if (indexOfData !== -1) {

                return chartvalues3[indexOfData];
            }
            else {
                return 0;
            }
        }));
        if (dataSet2.length > 0) {
            setMapdataSet2(dataSet2.map((number) => {
                return number.NoIt
            }));
        }

    })

    var options = {
        elements: {
            line: {
                tension: 0
            }
        }
    };




    const chartData = {
        labels: labelchartvalues2,
        Element: {
            Line: {
                tension: 0
            }
        },
        datasets: [
            {
                label: "Total Sales",
                data:
                    chartvalues2.map((number) => {
                        return number.NoIt
                    }),
                backgroundColor: [
                    'rgba(2, 52, 14, 0.1)',
                ],
                fill: true,
                borderColor: "green"
            },
            {
                label: "Your's Sales",
                data: MapdataSet,
                // chartvalues.map((number) => {
                //     return number.NoIt
                // }),
                backgroundColor: [
                    'rgba(1, 191, 113, 0.2)',
                ],
                fill: true,
                borderColor: "#01bf71"
            },
            {
                label: "Other's Sales",
                data: MapdataSet2,
                backgroundColor: [
                    'rgba(0,163,99, 0.2)',
                ],
                fill: true,
                borderColor: 'rgba(0,163,99, 1)'
            },

        ],
    }
    return (
        <div style={{ width: "80%", backgroundColor: "#dee7ed" }}>
            <Line
                data={chartData}
            />
        </div>
    )
}