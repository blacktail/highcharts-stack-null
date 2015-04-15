# highcharts-stack-null
A plugin for fixing the null points bug in Highcharts stack

# How to use

This plugin support an additional option *stackNull* for the *plotOptions.series*:

$("#container").highcharts({
  plotOptions: {
    series: {
      stackNull: true
    }
  }
});
