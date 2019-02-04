import React from 'react';

class Fixed2 extends React.PureComponent {
  render() {
    if (this.props.visnum == 0){
      return (
        // Hier ist this.props.children[1] das in
        // Fixed2 drinsteht
        <div className="fixed">
          {this.props.children[1]}
        </div>
      );
    }else{
      return(
        <div className="fixed">
          {this.props.children[2]}
          {this.props.children[3]}
        </div>
      )
    }
  }
}


Fixed2._idyll = {
  name: "Fixed2",
  tagType: "open"
}

module.exports = Fixed2;
