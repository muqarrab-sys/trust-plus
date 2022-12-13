import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
class CommonAlert extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }
  _setState(reducer) {
    return new Promise(resolve => this.setState(reducer, () => resolve()));
  }
  show({...config}) {
    const newConfig = {...config};
    this._setState(newConfig);
    this.RBSheet.open();
  }
  clearState() {
    this._setState({
      show: false,
      content: null,
    });
  }
  hide() {
    this.RBSheet.close();
    this.clearState();
  }
  static show({...config}) {
    this._ref.show({...config});
  }
  static hide() {
    this._ref.hide();
  }
  render() {
    const {content} = this.state;
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            alignItems: 'center',
          },
        }}>
        {content}
      </RBSheet>
    );
  }
}
export default CommonAlert;
