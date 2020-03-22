import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { useStaticQuery, graphql } from 'gatsby'

import ToggleLogButton from './ToggleLogButton'
import colors from 'assets/stylesheets/settings/_colors.scss'

const getOptions = (total, deaths, type) => ({
  title: {
    text: null
  },

  colors: [colors.blue],

  chart: {
    type: 'spline',
    style: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      fontWeight: 'medium'
    }
  },

  xAxis: {
    tickInterval: 7 * 24 * 3600 * 1000, // one week
    tickWidth: 0,
    gridLineWidth: 1,
    labels: {
      enabled: false,

      align: 'left',
      x: 3,
      y: -3
    },
    showFirstLabel: false,
    gridLineWidth: 0
  },

  yAxis: {
    tickInterval: type === 'logarithmic' ? 1 : 100,
    title: {
      text: null
    },
    type: type,
    labels: {
      enabled: true,
      align: 'right',
      x: -3,
      y: 4,
      format: '{value:.,0f}',
      gridLineWidth: 0
    },
    showFirstLabel: false,
    showLastLabel: true
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'bottom',
    borderWidth: 0
  },

  tooltip: {
    shared: true,
    crosshairs: true
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      marker: {
        lineWidth: 1
      },
      events: {
        // legendItemClick: function() {
        //   return false
        // }
      }
    }
  },
  series: [
    {
      name: 'Antal bekräftade fall totalt',
      data: [
        ['23 Februari 2020', 1],
        ['24 Februari 2020', 1],
        ['25 Februari 2020', 1],
        ['26 Februari 2020', 2],
        ['27 Februari 2020', 7],
        ['28 Februari 2020', 11],
        ['29 Februari 2020', 13],
        ['1 Mars 2020', 14],
        ['2 Mars 2020', 15],
        ['3 Mars 2020', 30],
        ['4 Mars 2020', 52],
        ['5 Mars 2020', 94],
        ['6 Mars 2020', 137],
        ['7 Mars 2020', 161],
        ['8 Mars 2020', 203],
        ['9 Mars 2020', 261],
        ['10 Mars 2020', 356],
        ['11 Mars 2020', 500],
        ['12 Mars 2020', 687],
        ['13 Mars 2020', 819],
        ['14 Mars 2020', 963],
        ['15 Mars 2020', 1032],
        ['16 Mars 2020', 1121],
        ['17 Mars 2020', 1196],
        ['18 Mars 2020', 1295],
        ['19 Mars 2020', 1443],
        ['20 Mars 2020', 1651],
        ['21 Mars 2020', 1765],
        ['22 Mars 2020', total]
      ],
      color: colors.red,
      marker: {
        symbol: 'none'
      }
    },
    {
      name: 'Antal bekräftade fall per dag',
      data: [
        ['23 Februari 2020', 0],
        ['24 Februari 2020', 0],
        ['25 Februari 2020', 1],
        ['26 Februari 2020', 1],
        ['27 Februari 2020', 5],
        ['28 Februari 2020', 4],
        ['29 Februari 2020', 2],
        ['1 Mars 2020', 1],
        ['2 Mars 2020', 1],
        ['3 Mars 2020', 15],
        ['4 Mars 2020', 22],
        ['5 Mars 2020', 42],
        ['6 Mars 2020', 43],
        ['7 Mars 2020', 24],
        ['8 Mars 2020', 42],
        ['9 Mars 2020', 57],
        ['10 Mars 2020', 96],
        ['11 Mars 2020', 144],
        ['12 Mars 2020', 187],
        ['13 Mars 2020', 132],
        ['14 Mars 2020', 144],
        ['15 Mars 2020', 66],
        ['16 Mars 2020', 89],
        ['17 Mars 2020', 75],
        ['18 Mars 2020', 99],
        ['19 Mars 2020', 148],
        ['20 Mars 2020', 208],
        ['21 Mars 2020', 114]
        // ['22 Mars 2020', total - 1765]
      ],
      color: colors.blue,
      marker: {
        symbol: 'none'
      }
    },
    {
      name: 'Antal dödsfall',
      data: [
        ['23 Februari 2020', 0],
        ['24 Februari 2020', 0],
        ['25 Februari 2020', 0],
        ['26 Februari 2020', 0],
        ['27 Februari 2020', 0],
        ['28 Februari 2020', 0],
        ['29 Februari 2020', 0],
        ['1 Mars 2020', 0],
        ['2 Mars 2020', 0],
        ['3 Mars 2020', 0],
        ['4 Mars 2020', 0],
        ['5 Mars 2020', 0],
        ['6 Mars 2020', 0],
        ['7 Mars 2020', 0],
        ['8 Mars 2020', 0],
        ['9 Mars 2020', 0],
        ['10 Mars 2020', 0],
        ['11 Mars 2020', 1],
        ['12 Mars 2020', 1],
        ['13 Mars 2020', 1],
        ['14 Mars 2020', 2],
        ['15 Mars 2020', 3],
        ['16 Mars 2020', 7],
        ['17 Mars 2020', 8],
        ['18 Mars 2020', 10],
        ['19 Mars 2020', 11],
        ['20 Mars 2020', 16],
        ['21 Mars 2020', 20],
        ['22 Mars 2020', deaths]
      ],
      color: colors.black,
      marker: {
        symbol: 'none'
      }
    }
  ]
})

const Chart = () => {
  const data = useStaticQuery(graphql`
    query {
      allTidsserieCsv {
        edges {
          node {
            Region_Total
            Region_Deaths
          }
        }
      }
    }
  `)

  function getTotalConfirmed(edges) {
    return edges.reduce(function(a, b) {
      return a + +b.node['Region_Total']
    }, 0)
  }

  function getTotalDeaths(edges) {
    return edges.reduce(function(a, b) {
      return a + +b.node['Region_Deaths']
    }, 0)
  }

  const [type, setType] = useState('linear')
  const total = getTotalConfirmed(data.allTidsserieCsv.edges)
  const deaths = getTotalDeaths(data.allTidsserieCsv.edges)
  const options = getOptions(total, deaths, type)

  return (
    <>
      <ToggleLogButton
        className="toggleLogButton"
        type={type}
        setType={setType}
      ></ToggleLogButton>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}

export default Chart