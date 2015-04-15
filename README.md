# highcharts-stack-null
A plugin for fixing the null points issue in Highcharts stack: https://github.com/highslide-software/highcharts.com/issues/2069

# How to use

This plugin support an additional option *stackNull* for the *plotOptions.series*:

···
$("#container").highcharts({
  plotOptions: {
    series: {
      stackNull: true
    }
  }
});
···

And here is a demo:
http://jsfiddle.net/esuqko5v/

