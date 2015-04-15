# highcharts-stack-null
A plugin for fixing the null points issue in Highcharts stack: https://github.com/highslide-software/highcharts.com/issues/2069

# How to use

First add this plugin just after your Highcharts

```
<script src="http://code.highcharts.com/3/highcharts.js"></script>
<script src="https://rawgit.com/blacktail/highcharts-stack-null/master/stack-null.js"></script>
```

Then, use the plotOptions.stackNull option like this:

```
$("#container").highcharts({
  plotOptions: {
    series: {
      stackNull: true
    }
  }
});
```

And here is a demo:
http://jsfiddle.net/esuqko5v/

