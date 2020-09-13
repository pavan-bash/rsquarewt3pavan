import React from "react";
import "./PriceRange.css";

/**
 * Props:
 * step // range multiplier
 * width // segment width
 * index // segment index
 * startIndex // for first segment only
 */
class Segment extends React.Component {
  render() {
    var dataStartIndex =
      this.props.startIndex === undefined ? "" : this.props.startIndex;

    return (
      <div className="-segment" style={{ width: this.props.width + "%" }}>
        {dataStartIndex !== undefined ? (
          <span className="-segmentStartIndex">{dataStartIndex}</span>
        ) : (
          ""
        )}
        <span className="-segmentIndex">
          {this.props.index * this.props.step}
        </span>
      </div>
    );
  }
}

/**
 * Props:
 * offsetAsPercent // % width of parent element
 */
class Indicator extends React.Component {
  render() {
    return (
      <span
        className="-indicator"
        style={{ width: this.props.offsetAsPercent }}
      ></span>
    );
  }
}

/**
 * Props:
 * ariaLabelledBy // aria label value
 * valueMin // min range value
 * valueMax // max range value
 * value // current value
 * offsetAsPercent // % left offset wrt parent element
 * initSliderUpdate // mouse down function
 */
class Control extends React.Component {
  render() {
    return (
      <span
        className="-control"
        role="slider"
        aria-labelledby={this.props.ariaLabelledBy}
        aria-valuemin={this.props.valueMin}
        aria-valuemax={this.props.valueMax}
        aria-valuenow={this.props.value}
        style={{ left: this.props.offsetAsPercent }}
        onMouseDown={this.props.initSliderUpdate}
      ></span>
    );
  }
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.updateSliderMouse = this.updateSliderMouse.bind(this);
    this.updateSliderKeyboard = this.updateSliderKeyboard.bind(this);
    this.initSliderUpdate = this.initSliderUpdate.bind(this);
    this.onSliderControlMoving = this.onSliderControlMoving.bind(this);
    this.onSliderControlStopped = this.onSliderControlStopped.bind(this);

    this.mouseMoveTriggered = false;
    this.componentClasses =
      "modSlider _slider " +
      this.props.name +
      (this.props.noAnimation ? " x-noAnimation" : "");
    this.derivedValues = {};

    this.state = {
      value: this.props.initialValue,
    };
  }

  componentWillMount() {
    // Initialize the derived values when mounting the component
    this.derivedValues = this.setDerivedValues(
      this.props.segments,
      this.props.segmentMin,
      this.props.step
    );

    // Ensure the initial 'value' lies within the slider's min..max range
    this.setState({ value: this.getValueInRange(this.state.value) });
  }

  componentWillUpdate(nextProps, nextState) {
    // On state change, update the derived values prior to rendering
    this.derivedValues = this.setDerivedValues(
      nextProps.segments,
      nextProps.segmentMin,
      nextProps.step
    );

    // Ensure the next value lies within the slider's min..max range
    nextState.value = this.getValueInRange(nextState.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // TODO: Determine best way to broadcast slider value change (guessing callback is sufficient)
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      if (this.props.callback instanceof Function) {
        // Call the provided callback function
        this.props.callback(this.state.value);
      } else {
        // Use hootbus to emit an event?
        console.log("trigger hootbus event:", this.state.value);

        // - OR -

        // Old school event trigger
        this.$el.trigger({
          type: "sliderValueUpdated",
          value: this.state.value,
        });
      }
    }
  }

  getMaxSegmentValue() {
    return this.derivedValues.segmentMax;
  }

  getValueInRange(value) {
    var valueInRange = value;
    var rangeMin = this.props.segmentMin * this.props.step;
    var rangeMax = this.derivedValues.segmentMax * this.props.step;

    if (value < rangeMin) {
      valueInRange = rangeMin;
    }

    if (value > rangeMax) {
      valueInRange = rangeMax;
    }

    return valueInRange;
  }

  setDerivedValues(segments, segmentMin, step) {
    // These values must be re-calculated on state change
    var segmentMax = segmentMin + segments;
    var segmentWidth = 100 / segments;

    var valueMin = segmentMin * step;
    var valueMax = segmentMax * step;

    var totalSegments = segmentMax - segmentMin;

    return {
      segmentMax: segmentMax,
      segmentWidth: segmentWidth,
      totalSegments: totalSegments,
      valueMin: valueMin,
      valueMax: valueMax,
    };
  }

  initSliderUpdate() {
    this.mouseMoveTriggered = false;

    var bodyElement = React.findDOMNode(this).ownerDocument.body;
    bodyElement.addEventListener("mousemove", this.onSliderControlMoving, true);
    bodyElement.addEventListener("mouseup", this.onSliderControlStopped, true);
  }

  onSliderControlMoving(e) {
    e.preventDefault();
    this.mouseMoveTriggered = true;
    this.updateSliderMouse(e);
  }

  onSliderControlStopped(e) {
    e.preventDefault();
    this.mouseMoveTriggered = false;

    var bodyElement = React.findDOMNode(this).ownerDocument.body;
    bodyElement.removeEventListener(
      "mousemove",
      this.onSliderControlMoving,
      true
    );
    bodyElement.removeEventListener(
      "mouseup",
      this.onSliderControlStopped,
      true
    );
  }

  updateSliderKeyboard(e) {
    var currValue = this.state.value;
    var key = currValue / this.props.step;
    var newValue;

    switch (e.keyCode) {
      case 38: // up arrow
      case 39: // right arrow
        // Prevent arrow keys from moving the browser window on focus
        e.preventDefault();
        key++;
        key = Math.min(key, this.derivedValues.segmentMax);
        break;
      case 37: // left arrow
      case 40: // down arrow
        // Prevent arrow keys from moving the browser window on focus
        e.preventDefault();
        key--;
        key = Math.max(key, this.props.segmentMin);
        break;
    }

    newValue = key * this.props.step;

    if (newValue !== currValue) {
      // Update the current state of the slider
      this.setState({ value: newValue });
    }
  }

  getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }

  updateSliderMouse(e) {
    // Prevent click event directly after a mouseup event occurs
    if (this.mouseMoveTriggered && e.type === "click") {
      this.mouseMoveTriggered = false;
      return;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: Replace jQuery .offset().left with vanilla javascript
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // This may just work...
    var sliderOffset = this.getPosition(React.findDOMNode(this));
    var mouseX = e.clientX - sliderOffset.x;

    // jQuery way - replace!
    //      var sliderLeftOffset = this.$el.offset().left + parseInt(this.$el.css('border-left-width'), 10);
    //      var mouseX = e.pageX - sliderLeftOffset;
    var segmentWidth =
      React.findDOMNode(this.refs[this.props.name]).clientWidth /
      this.derivedValues.totalSegments;
    var activeSegment = Math.floor((mouseX + segmentWidth / 2) / segmentWidth);

    var currValue = this.state.value;
    var newValue = (this.props.segmentMin + activeSegment) * this.props.step;

    if (newValue !== currValue) {
      // Update the current state of the slider
      this.setState({ value: newValue });
    }
  }

  getIndicatorProps(offsetAsPercent) {
    return {
      offsetAsPercent: offsetAsPercent,
    };
  }

  getControlProps(offsetAsPercent) {
    return {
      ariaLabelledBy: this.props.ariaLabelledBy,
      valueMin: this.derivedValues.valueMin,
      valueMax: this.derivedValues.valueMax,
      value: this.state.value,
      initSliderUpdate: this.initSliderUpdate,
      mouseDown: this.controlMouseDown,
      mouseUp: this.controlMouseUp,
      offsetAsPercent: offsetAsPercent,
    };
  }

  getSegmentProps(segment, segmentFirstIndex) {
    var segmentProps = {
      step: this.props.step,
      width: this.derivedValues.segmentWidth,
      index: segment,
    };

    // The first segment shows the segmentMin value on the left side
    if (segment == segmentFirstIndex) {
      segmentProps["startIndex"] = this.props.segmentMin;
    }

    return segmentProps;
  }

  render() {
    var componentStyles = {
      width: this.props.width,
      visibility: "visible",
    };

    var offsetAsPercent =
      (this.state.value / this.props.step - this.props.segmentMin) *
        this.derivedValues.segmentWidth +
      "%";
    var segments = [];

    if (!this.props.hideMarkers) {
      var segmentFirstIndex = this.props.segmentMin + 1;

      for (
        var segment = segmentFirstIndex;
        segment <= this.derivedValues.segmentMax;
        segment++
      ) {
        segments.push(
          <Segment
            {...this.getSegmentProps(segment, segmentFirstIndex)}
            key={segment}
          />
        );
      }
    }

    return (
      <div
        className={this.componentClasses}
        ref={this.props.name}
        style={componentStyles}
        onClick={this.updateSliderMouse}
        onKeyDown={this.updateSliderKeyboard}
        aria-hidden={this.props.ariaHidden}
        tabIndex="0"
      >
        {segments}
        <Indicator {...this.getIndicatorProps(offsetAsPercent)} />
        <Control {...this.getControlProps(offsetAsPercent)} />
      </div>
    );
  }
}

Slider.defaultProps = {
  name: "_slider" + new Date().getTime(), // unique slider identifier
  width: 200, // width can be in any valid measure (eg - px, %)
  segments: 10, // total number of segments
  segmentMin: 0, // segment range min value
  step: 1, // range multiplier
  initialValue: 0, // current slider value
  noAnimation: false, // disable css animation when true
  ariaHidden: false, // set component visibility for screen readers
  ariaLabelledBy: null, // used to add aria-labelledby to the control
  hideMarkers: false, // hide numeric markers if true
};

var testCallbackFcn = function (value) {
  // console.log('slider value updated:', value);
};

// Pass in specific props for the slider
var sliderOneProps = {
  name: "_sliderOne",
  ariaLabelledBy: "ariaSeatsFeatureLabel",
  segments: 9,
  initialValue: 4,
  width: 390,
  step: 2,
  //   noAnimation: true,
  callback: testCallbackFcn,
};

var sliderTwoProps = {
  segments: 4,
  segmentMin: -4,
  initialValue: 8,
  width: "50%",
  noAnimation: true,
  callback: testCallbackFcn,
};

// var sliderOne = React.render(
//   <Slider {...sliderOneProps} />,
//   document.querySelector("._sliderOneContainer")
// );

export default <Slider {...sliderOneProps} />;

// Try setting the slider value to an invalid value
//sliderOne.setState({value: 18});

// Get the max segment value
//console.log('Max segment value:', sliderOne.getMaxSegmentValue());
