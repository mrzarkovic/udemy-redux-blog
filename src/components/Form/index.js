import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Input from './InputField';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.successCallback = this.successCallback.bind(this);
  }

  successCallback() {
    if (typeof this.props.successCallback == 'function') {
      return this.props.successCallback();
    }

    if (this.props.successComponent) {
      this.setState({ success: true });
    }
  }

  onSubmit(values) {
    this.props.action(values, this.successCallback);
  }

  conditionalRender() {
    const { handleSubmit, children } = this.props;

    if (this.props.successComponent && this.state.success) {
      return React.createElement(this.props.successComponent);
    }

    return <form onSubmit={handleSubmit(this.onSubmit)}>{children}</form>;
  }

  render() {
    return this.conditionalRender();
  }
}

function formWithRedux(form, action, validate) {
  return reduxForm({
    validate,
    form
  })(
    connect(
      null,
      { action }
    )(Form)
  );
}

function getValidateFor(inputs) {
  return function(values) {
    const errors = {};

    for (let {
      props: { name }
    } of inputs) {
      !values[name] && (errors[name] = 'This field is required!');
    }

    return errors;
  };
}

export default props => {
  const { form, action, children } = props;
  const validatedInputs = children.filter(child => {
    return !!child.props.validate;
  });

  const validateFunction = getValidateFor(validatedInputs);

  return React.createElement(
    formWithRedux(form, action, validateFunction),
    { ...props },
    children
  );
};

export const InputField = Input;
