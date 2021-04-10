import React, {useEffect,useState} from 'react'
import {Bar, Line,Pie} from 'react-chartjs-2';
import moment from "moment";
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default function Chart() {
    const [chartvalues,setchartvalues]=useState([])
    const [test,settest]=useState([])

    var day1,day2,day3,day4,day5,day6,day7,dispday1,dispday7
    const today = moment();
    day1 =moment().day(0).format("dddd").toString();
    day2  = moment().day(1).format("dddd").toString();
    day3  = moment().day(2).format("dddd").toString();
    day4  = moment().day(3).format("dddd").toString();
    day5  = moment().day(4).format("dddd").toString();
    day6  = moment().day(5).format("dddd").toString();
    day7 = moment().day(6).format("dddd").toString();
    
    dispday1 = today.startOf('week').format("DD-MM-YYYY").toString();
    dispday7 = today.endOf('week').format("DD-MM-YYYY").toString();

    var disp1day1 = moment().day(0).format("YYYY-MM-DD").toString();
    var dispday2  = moment().day(1).format("YYYY-MM-DD").toString();
    var dispday3  = moment().day(2).format("YYYY-MM-DD").toString();
    var dispday4  = moment().day(3).format("YYYY-MM-DD").toString();
    var dispday5  = moment().day(4).format("YYYY-MM-DD").toString();
    var dispday6  = moment().day(5).format("YYYY-MM-DD").toString();
    var disp1day7 = moment().day(6).format("YYYY-MM-DD").toString();
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.post('http://localhost:3001/getdate', {
            day1 : disp1day1,
            day2  : dispday2,
            day3  : dispday3,
            day4  : dispday4,
            day5  : dispday5,
            day6  : dispday6,
            day7 : disp1day7,
        }).then(() => {
        //    console.log("dates sent!")
           Axios.get('http://localhost:3001/getchartdata').then((response) => {
           setchartvalues(response.data)
        //    console.log("chartvalues",response.data)

          });
        });
    },[]);
    
    const maxDataEntry =Math.max(...chartvalues.map(o => o.NoIt), 0);
    // console.log("maxDataEntry",maxDataEntry)
    const chartData ={
        labels: [day1,day2 ,day3 ,day4 ,day5 ,day6 ,day7 ],
    datasets: [
        {
            label: "Daily Sales",
            data: 
                chartvalues.map((number)=>{   
                    return number.NoIt
                },)
            ,
            backgroundColor: [
                'rgba(27, 45, 65, 0.6)',
                'rgba(58, 107, 110, 0.6)',
                'rgba(99, 169, 166, 0.6)',
                'rgba(191, 209, 207, 0.6)',
                'rgba(99, 169, 166, 0.8)',
                'rgba(232, 248, 237, 1)',
                'rgba(12, 41, 51, 0.6)',
            ]
        }
    ],
      
}
const options = {
    legend: {
        display: false,
    },
    scales: {
        yAxes: [{
          ticks: {
            reverse: false,
            suggestedMax: maxDataEntry + 1,
            stepSize: 1,
            beginAtZero: true,
          }
        }]
      }
  }
    return (
        <div>
            <h6 style={{ color: "grey", padding:"12px" }}>Sales from <span style={{ color: "#01bf71", marginLeft: "2px", marginRight: "2px" }}>{dispday1} </span>  to <span style={{ color: "#01bf71", marginLeft: "2px", marginRight: "2px" }}>{dispday7}</span> </h6>
             <Bar
                    data={chartData}
                    options={options}
                />
        </div>
    )
}
