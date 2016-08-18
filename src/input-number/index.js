import React, {Component, PropTypes} from 'react';
import {HOC} from 'formsy-react';
import InputNumber from 'antd/lib/input-number';

class FormsyInputNumber extends Component {
  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    formsyAntd: PropTypes.shape({
      emitError: PropTypes.func.isRequired
    })
  };

  componentWillUpdate() {
    if (this.context.formsyAntd && !this.props.isPristine()) {
      const message = this.props.getErrorMessage();
      const status = message === null ? 'success' : 'error';
      this.context.formsyAntd.emitError(message, status);
    }
  }

  render() {
    const {getValue, setValue, required, ...props} = this.props;
    return (
      <InputNumber
        {...props}
        value={getValue() || ''}
        onChange={setValue}
      />
    );
  }
}

export default HOC(FormsyInputNumber);