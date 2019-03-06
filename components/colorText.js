const React = require('react');

const colors = {
  '0':   'yellowText',
  '1':   'redText',
  '2':   'greenText',
  '3':   'greenText'
};

function label(value) {
  if (value==0){
    return 'Vergleichsknoten k = 00'
  }
  if (value==1){
    return 'Startknoten i = 01'
  }
  if (value==2){
    return 'Endknoten j = 01'
  }
  if (value==3){
    return 'Endknoten j = 02'
  }
}

// A custom component that prints a colored theta parameter link
// Hovering over the link updates theta and focus variables
class colorText extends React.PureComponent {

  // On mouseover, push update to set theta value and enable focus
  over() {
    this.props.updateProps({
      color: this.props.value,
    });
  }

  render() {
    return (
      <span> <span
        className={colors[this.props.value]}
      >{label(this.props.value)}</span></span>
    );
  }
}

module.exports = colorText;
