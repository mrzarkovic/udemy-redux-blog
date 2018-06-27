import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { createPost } from '../actions';

import Form, { InputField } from './Form';

const successComponent = () => <div>Form has been submitted!</div>;

class PostsNew extends Component {
  formSuccess() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Form
        form="PostsNewForm"
        action={createPost}
        successCallback={this.formSuccess.bind(this)}
        successComponent={successComponent}
      >
        <InputField label="Title for Post" name="title" validate />
        <InputField label="Categories" name="categories" validate />
        <InputField label="Post Content" name="content" validate />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </Form>
    );
  }
}

export default PostsNew;
