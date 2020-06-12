import React, { PureComponent } from 'react';
import { PanelEditorProps, SelectableValue } from '@grafana/data'; // option and onOptionsChange()
import { Select, Icon } from '@grafana/ui';
//import { css } from 'emotion';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/addon/display/autorefresh'; // auto render content in editor when editor is loaded at the first time

import { SimpleOptions } from './types'; //{echartTheme: undefined , funcBody: funcBody}

import CodeEditor from './codeEditor';
import './style.css'; // css of two link buttons

// const getStyles = stylesFactory(() => ({
//   span: css`
//     background-color: #4caf50; /* Green */
//     border: none;
//     color: white;
//     padding: 15px 32px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//   `,
// }));

export interface SimpleEditor {
  editorRef: React.RefObject<HTMLElement> | any;
  cm: CodeMirror.EditorFromTextArea;
  // styles: any;
}
// ---- code reading ----
// interface PanelEditorProps<T = any>
// export interface PanelEditorProps<T = any> {
//   /** Panel options */
//   options: T;
//   /** Panel options change handler */
//   onOptionsChange: (options: T, callback?: () => void) => void;
//   /** Result set of panel queries */
//   data: PanelData;

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  constructor(props: any) {
    super(props);

    this.editorRef = React.createRef();
    // this.styles = getStyles();
  }

  // initialize CodeMirror Editor
  componentDidMount() {
    // CodeMirror.fromTextArea replace the textarea with a CodeMirror instance cm https://codemirror.net/doc/manual.html#fromTextArea
    this.cm = CodeMirror.fromTextArea(this.editorRef.current, {
      theme: 'ayu-mirage',
      mode: 'javascript',
      tabSize: 2,
      autoRefresh: true,
    });

    // when mouse focus is moved out of editor textarea, update funcBody prop
    this.cm.on('blur', (cm: any) => {
      this.props.onOptionsChange({ ...this.props.options, funcBody: cm.doc.getValue() });
      //console.log(this.props);
    });
  }

  // remove cm when unmount to prevent memory leak
  componentWillUnmount() {
    if (this.cm) {
      this.cm.toTextArea();
    }
  }

  // ---- code reading ----
  // console.log(this.props.onOptionsChange)
  // this.props.onOptionsChange is actually calling:
  // onPanelOptionsChanged = (options: any, callback?: () => void) => {
  //   this.props.panel.updateOptions(options);
  //   this.forceUpdate(callback);
  // };
  onChange(e: SelectableValue<any>) {
    // console.log('e', e);
    // console.log('e.desp', e.description);

    // update echarTheme prop when theme selection changes
    this.props.onOptionsChange({ ...this.props.options, echartTheme: e.description });
  }

  reportBug() {
    let mail = document.createElement('a');
    mail.href = 'mailto:boqian.yang@vwfsag.com';
    mail.click();
  }

  toThemeURL() {
    let url = document.createElement('a');
    url.href = 'https://echarts.apache.org/en/download-theme.html';
    url.target = '_blank'; // open link in new tab
    url.click();
  }

  render() {
    const selectOptions = [
      { label: 'none', value: 0, description: 'follow grafana theme' },
      { label: 'dark', value: 1, description: 'dark' },
      { label: 'infographic', value: 2, description: 'infographic' },
      { label: 'macarons', value: 3, description: 'macarons' },
      { label: 'shine', value: 4, description: 'shine' },
      { label: 'roma', value: 5, description: 'roma' },
      { label: 'vintage', value: 6, description: 'vintage' },
    ];
    return (
      <>
        <CodeEditor label="Chart Theme" description="Select Chart Theme  ( more themes can be added upon requests )">
          <div className="gf-form">
            <label className="gf-form-label width-6">Theme</label>
            <Select options={selectOptions} onChange={e => this.onChange(e)}></Select>
          </div>
          <p></p>
          <div className="markdown-html">
            <button className="themeButton" onClick={this.toThemeURL}>
              <Icon name="link" />
              &nbsp;Chart Themes References
            </button>
            <button className="reportButton" onClick={this.reportBug}>
              <Icon name="bug" />
              &nbsp;Report a bug
            </button>
          </div>
        </CodeEditor>
        <CodeEditor label="Echarts Option" description='Build echarts option and return it with "return option"'>
          <div>
            <p>
              <i>Known issue: when an error is thrown, page must be refreshed to load new codes.</i>
            </p>
            <textarea ref={this.editorRef} value={this.props.options.funcBody} />
          </div>
          <p></p>
          <div className="markdown-html">
            The code block composes function:
            <code>{`function (data, theme, echartsInstance, echarts){return option}`}</code>
            <ul>
              <li>
                <i>data: data queried from Grafana Datasource</i>
              </li>
              <li>
                <i>echartsInstance: current instance of chart, mainly used for drawing custom chart</i>
              </li>
              <li>
                <i>echarts: imported echarts lib</i>
              </li>
            </ul>
          </div>
        </CodeEditor>
      </>
    );
  }
}
