import React, { Component } from 'react';
import { Spin } from 'antd';
import _ from 'lodash';
import request from '@pkgs/request';
import api from '@common/api';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: '',
    };
  }

  componentDidMount = () => {
    this.fetchData();
    document.title = '任务输出';
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  }

  componentWillMount = () => {
    document.body.style.backgroundColor = '#f0f2f5';
    document.body.style.color = 'rgba(0, 0, 0, 0.65)';
  }

  getOutput() {
    const host = _.get(this.props, 'match.params.host');
    const { data } = this.state;
    let output = '';
    output += `${host}\n`;
    output += `${data}\n\n`;
    return output;
  }

  fetchData() {
    const taskId = _.get(this.props, 'match.params.taskId');
    const host = _.get(this.props, 'match.params.host');
    const outputType = _.get(this.props, 'match.params.outputType');

    if (taskId !== undefined && host !== undefined) {
      this.setState({ loading: true });
      request(`${api.task}/${taskId}/host/${host}/${outputType}`).then((data) => {
        this.setState({ data });
      }).finally(() => {
        this.setState({ loading: false });
      });
    }
  }

  render() {
    const { loading } = this.state;
    const output = this.getOutput();
    return (
      <Spin spinning={loading}>
        <pre style={{ fontSize: 12, padding: 10, height: '100vh' }}>
          {output}
        </pre>
      </Spin>
    );
  }
}