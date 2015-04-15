(function (Highcharts) {
    Highcharts.wrap(Highcharts.seriesTypes.area.prototype, 'getSegments', function (process) {
        var series = this,
            segments = [],
            segment = [],
            keys = [],
            xAxis = this.xAxis,
            yAxis = this.yAxis,
            stack = yAxis.stacks[this.stackKey],
            pointMap = {},
            plotX,
            plotY,
            points = this.points,
            connectNulls = this.options.connectNulls,
            stackNull = this.options.stackNull,
            i,
            x,
            each = Highcharts.each;

        if (this.options.stacking && !this.cropped && !stackNull) { // cropped causes artefacts in Stock, and perf issue
            // Create a map where we can quickly look up the points by their X value.
            for (i = 0; i < points.length; i++) {
                pointMap[points[i].x] = points[i];
            }

            // Sort the keys (#1651)
            for (x in stack) {
                if (stack[x].total !== null) { // nulled after switching between grouping and not (#1651, #2336)
                    keys.push(+x);
                }
            }
            keys.sort(function (a, b) {
                return a - b;
            });

            each(keys, function (x) {
                var y = 0,
                    stackPoint;

                if (connectNulls && (!pointMap[x] || pointMap[x].y === null)) { // #1836
                    return;

                    // The point exists, push it to the segment
                } else if (pointMap[x]) {
                    segment.push(pointMap[x]);

                    // There is no point for this X value in this series, so we
                    // insert a dummy point in order for the areas to be drawn
                    // correctly.
                } else {

                    // Loop down the stack to find the series below this one that has
                    // a value (#1991)
                    for (i = series.index; i <= yAxis.series.length; i++) {
                        stackPoint = stack[x].points[i + ',' + x];
                        if (stackPoint) {
                            y = stackPoint[1];
                            break;
                        }
                    }

                    plotX = xAxis.translate(x);
                    plotY = yAxis.toPixels(y, true);
                    segment.push({
                        y: null,
                        plotX: plotX,
                        clientX: plotX,
                        plotY: plotY,
                        yBottom: plotY,
                        onMouseOver: noop
                    });
                }
            });

            if (segment.length) {
                segments.push(segment);
            }

        } else {
            Highcharts.Series.prototype.getSegments.call(this);
            segments = this.segments;
        }

        this.segments = segments;
    });
})(Highcharts);
